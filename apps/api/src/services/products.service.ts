import { imageCreate, imageUpdate } from '@/libs/prisma/images.args';
import { createProductSchema, createVariantSchema, updateProductSchema, updateVariantSchema } from '@/libs/zod-schemas/product.schema';
import prisma from '@/prisma';
import { BadRequestError, catchAllErrors, InternalServerError } from '@/utils/error';
import { countTotalPage, paginate } from '@/utils/pagination';
import { reqBodyReducer } from '@/utils/req.body.helper';
import { Prisma } from '@prisma/client';
import { Request } from 'express';
import { ZodError } from 'zod';

class ProductsService {
  async getProducts(req: Request) {
    const { show, page, search } = req.query;
    const queries: Prisma.ProductWhereInput = { name: { contains: String(search) }, AND: { is_deleted: false } };
    try {
      const data = await prisma.product.findMany({
        where: queries,
        orderBy: { name: 'asc' },
        include: { variants: { include: { images: { select: { id: true, name: true } } } }, category: true, sub_category: true },
        ...paginate(Number(show), Number(page)),
      });
      if (!data) throw new InternalServerError('Unable to fetch data.');
      const count = await prisma.product.count({ where: queries });
      return { data, totalPages: countTotalPage(count, Number(show)) };
    } catch (error) {
      catchAllErrors(error);
    }
  }
  async getProductIdsAndNames(req: Request) {
    const { search } = req.query;
    try {
      const queries: Prisma.ProductFindManyArgs = {
        where: { is_deleted: false },
        orderBy: { updated_at: 'desc' },
        select: { id: true, name: true },
      };
      if (search) queries.where = { is_deleted: false, AND: { name: { contains: String(search) } } };
      const data = await prisma.product.findMany(queries);
      if (!data) throw new InternalServerError('Unable to fetch data.');
      return data;
    } catch (error) {
      catchAllErrors(error);
    }
  }
  async getProductsWithVariants(req: Request) {
    const { show, page, search } = req.query;
    const queries: Prisma.ProductVariantsWhereInput = {
      is_deleted: false,
      AND: { OR: [{ name: { contains: String(search) } }, { product: { name: { contains: String(search) } } }] },
    };
    try {
      const data = await prisma.productVariants.findMany({
        where: queries,
        orderBy: { name: 'asc' },
        include: { product: { include: { category: true, sub_category: true } }, images: true },
        ...paginate(Number(show), Number(page)),
      });
      if (!data) throw new InternalServerError('Unable to fetch data.');
      const count = await prisma.productVariants.count({ where: queries });
      return { data, totalPages: countTotalPage(count, Number(show)) };
    } catch (error) {
      catchAllErrors(error);
    }
  }
  async createProduct(req: Request) {
    try {
      const { category_id, sub_category_id } = req.body;
      const validate = createProductSchema.safeParse(req.body);
      if (!validate.success) throw new ZodError(validate.error.errors);
      await prisma.product.create({
        data: {
          ...req.body,
          sub_category_id: Number(sub_category_id),
          category_id: Number(category_id),
        },
      });
    } catch (error) {
      catchAllErrors(error);
    }
  }
  async createVariant(req: Request) {
    const { file } = req;
    try {
      if (req.body.weight) req.body.weight = Number(req.body.weight);
      const validate = createVariantSchema.safeParse(req.body);
      if (!validate.success) throw new ZodError(validate.error.errors);
      if (!file) throw new BadRequestError('Image is required.');
      await prisma.$transaction(async (prisma) => {
        const imageID = await prisma.image.create(await imageCreate(req, 'product'));
        await prisma.productVariants.create({
          data: { ...req.body, image_id: imageID.id },
        });
      });
    } catch (error) {
      catchAllErrors(error);
    }
  }
  async updateProduct(req: Request) {
    try {
      const { name, description, category_id, sub_category_id } = req.body;
      if (category_id) req.body.category_id = Number(category_id);
      if (sub_category_id) req.body.sub_category_id = Number(sub_category_id);
      if (name || description) {
        const validate = updateProductSchema.safeParse(req.body);
        if (!validate.success) throw new ZodError(validate.error.errors);
      }
      await prisma.product.update({
        where: { id: req.params.id },
        data: { ...reqBodyReducer(req.body) },
      });
    } catch (error) {
      catchAllErrors(error);
    }
  }
  async updateVariant(req: Request) {
    try {
      const { file } = req;
      if (req.body.weight) req.body.weight = Number(req.body.weight);
      const validate = updateVariantSchema.safeParse(req.body);
      if (!validate.success) throw new ZodError(validate.error.errors);
      await prisma.$transaction(async (prisma) => {
        const variant = await prisma.productVariants.update({
          where: { id: req.params.id },
          data: { ...reqBodyReducer(req.body) },
        });
        if (file) {
          await prisma.image.update(await imageUpdate(req, variant.image_id || ''));
        }
      });
    } catch (error) {
      catchAllErrors(error);
    }
  }
  async deleteProduct(req: Request) {
    const { id } = req.params;
    try {
      const product = await prisma.product.findFirst({ where: { id }, include: { variants: true } });
      if (!product) throw new InternalServerError('Unable to find product.');
      await prisma.product.update({ where: { id }, data: { is_deleted: true } });
      await prisma.productVariants.updateMany({
        where: { id: { in: product?.variants.map((variant) => variant.id) as string[] } },
        data: { is_deleted: true },
      });
    } catch (error) {
      catchAllErrors(error);
    }
  }
  async deleteVariant(req: Request) {
    const { id } = req.params;
    try {
      await prisma.productVariants.update({ where: { id }, data: { is_deleted: true } });
    } catch (error) {
      catchAllErrors(error);
    }
  }
}

export default new ProductsService();
