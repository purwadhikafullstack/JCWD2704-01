import sharp from 'sharp';
import prisma, { userTransactionOption } from '@/prisma';
import { verify } from 'jsonwebtoken';
import type { Request } from 'express';

import { createToken } from '@/libs/jwt';
import { generateSlug } from '@/utils/generate';
import { comparePassword, hashPassword } from '@/libs/bcrypt';
import { BadRequestError, NotFoundError } from '@/utils/error';
import { userCreateInput, userCreateVoucherInput, userUpdateInput } from '@/constants/user.constant';
import { ACC_SECRET_KEY, FP_SECRET_KEY, REFR_SECRET_KEY, VERIF_SECRET_KEY } from '@/config';
import { userForgotSchema, userLoginSchema, userRegisterSchema, userUpdateSchema, userValidationEmailSchema } from '@/schemas/user.schema';

class UserService {
  async register(req: Request) {
    const file = req.file;
    const validate = userRegisterSchema.parse(req.body);
    await prisma.$transaction(async (tx) => {
      const checkUser = await tx.user.findFirst({ where: { email: validate.email } });
      const checkPhoneNo = await tx.user.findFirst({ where: { phone_no: validate.phone_no } });
      const data = await userCreateInput({ ...validate });
      if (checkUser) throw new BadRequestError('Email address is already associated with an existing account in the system.');
      if (checkPhoneNo) throw new BadRequestError('Phone Number is already associated with an existing account in the system.');
      if (validate.referrence_code) {
        const checkCode = await tx.user.findFirst({ where: { referral_code: validate.referrence_code } });
        if (!checkCode) throw new NotFoundError('Referral invalid');
        data.reference_code = validate.referrence_code;
      }

      const user = await tx.user.create({ data });
      const registerToken = createToken({ id: user.id }, VERIF_SECRET_KEY, '15m');
      if (file) {
        const blob = await sharp(file.buffer).webp().toBuffer();
        const name = `${generateSlug(file.fieldname)}-${user.id}`;
        const image = await tx.image.create({
          data: { blob, name, type: 'avatar' },
        });

        await tx.user.update({
          where: { id: user.id },
          data: { avatar_id: image.id },
        });
      }

      console.log(registerToken);

      // await sendEmail({
      //   email_to: data.email,
      //   href: `${CORS_URL}/verify`,
      //   template_dir: '../templates/register.hbs',
      //   subject: 'Confirm your account - Farm2Door',
      // });
    }, userTransactionOption);
  }

  async verification(req: Request) {
    const { token } = req.params;
    const { id } = verify(token, VERIF_SECRET_KEY) as { id: string };
    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.findFirst({ where: { id } });
      if (!user) throw new NotFoundError('Invalid data');
      if (user.is_verified) throw new BadRequestError("You're already verified");
      if (user.reference_code && !user.voucher_id) {
        const voucher = await tx.promotion.create({
          data: userCreateVoucherInput(),
        });

        await tx.user.update({
          where: { id: user.id },
          data: { voucher: { connect: { id: voucher.id } } },
        });
      }

      await tx.user.update({
        where: { id },
        data: { is_verified: true },
      });
    }, userTransactionOption);
  }

  async login(req: Request) {
    const { email, password } = userLoginSchema.parse(req.body);
    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { email } });
      if (!user?.password)
        throw new NotFoundError("We're sorry, the email address you entered is not registered in our system.", {
          cause: 'Please double-check the email address you entered and make sure there are no typos.',
        });

      const checkPassword = await comparePassword(user.password, password);
      console.log(checkPassword);
      if (!checkPassword) throw new BadRequestError('Wrong password');
      if (!user.is_verified) throw new BadRequestError('Need to verify your account');
      const { password: _password, ...data } = user;
      const refreshToken = createToken({ id: user.id }, REFR_SECRET_KEY, '30d');
      const accessToken = createToken({ ...data }, ACC_SECRET_KEY, '15m');
      return { accessToken, refreshToken };
    }, userTransactionOption);
  }

  async authorization(req: Request) {
    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.findFirst({ where: { id: req.user?.id } });
      if (!user?.voucher_id) throw new BadRequestError('Need to login');
      const voucher = await tx.promotion.findFirst({ where: { id: user.voucher_id } });
      if (new Date() === voucher?.expiry_date) {
        await tx.promotion.update({ where: { id: voucher.id }, data: { is_valid: false } });
      }

      const { password: _password, ...data } = user;
      const accessToken = createToken({ ...data }, REFR_SECRET_KEY, '15m');
      return { accessToken };
    }, userTransactionOption);
  }

  async update(req: Request) {
    const file = req.file;
    const validate = userUpdateSchema.parse({
      ...(req.body.email && { email: req.body.email }),
      ...(req.body.full_name && { full_name: req.body.full_name }),
      ...(req.body.password && { password: req.body.password }),
      ...(req.body.phone_no && { phone_no: req.body.phone_no }),
      ...(req.body.dob && { dob: req.body.dob }),
    });
    return await prisma.$transaction(async (tx) => {
      const findUnique = await tx.user.findFirst({ where: { OR: [{ email: validate.email }, { phone_no: validate.phone_no }] } });
      if (findUnique?.email || findUnique?.phone_no) throw new BadRequestError('Email or Phone Number is already exist');
      if (file) {
        const blob = await sharp(file.buffer).webp().toBuffer();
        const name = `${generateSlug(file.fieldname)}-${req.user?.id}`;
        if (!req.user?.avatar_id) {
          const image = await tx.image.create({
            data: { blob, name, type: 'avatar' },
          });

          await tx.user.update({
            where: { id: req.user?.id },
            data: { avatar_id: image.id },
          });
        } else {
          await tx.image.update({
            where: { id: req.user?.avatar_id },
            data: { blob, name },
          });
        }
      }
      const user = await tx.user.update({
        where: { id: req.user?.id },
        data: await userUpdateInput({ ...validate }),
      });

      const { password: _password, ...data } = user;
      const accessToken = createToken({ ...data }, REFR_SECRET_KEY, '15m');
      return { accessToken };
    }, userTransactionOption);
  }

  async forgetPassword(req: Request) {
    const { password } = userForgotSchema.parse(req.body);
    console.log('body', req.body);
    const { token: FPToken } = req.params;
    return await prisma.$transaction(async (tx) => {
      const { id } = verify(FPToken, FP_SECRET_KEY) as { id: string };
      if (!id) throw new BadRequestError('Need to verify email');
      await tx.user.update({ where: { id }, data: { password: await hashPassword(password) } });
    }, userTransactionOption);
  }

  async forgetPasswordVerification(req: Request) {
    const { email } = userValidationEmailSchema.parse(req.body);
    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { email } });
      if (!user) throw new NotFoundError('Cannot found your Email');
      const resetToken = createToken({ id: user.id }, FP_SECRET_KEY, '1d');
      await tx.user.update({ where: { id: user.id }, data: { reset_token: resetToken } });

      console.log(resetToken);
    });
  }

  async deactive(req: Request) {}
}

export default new UserService();
