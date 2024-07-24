import { categoryCreate, categoryUpdate } from '@/libs/prisma/category.args';
import { imageCreate, imageUpdate } from '@/libs/prisma/images.args';
import prisma from '@/prisma';
import { BadRequestError, catchAllErrors, InternalServerError } from '@/utils/error';
import { countTotalPage, paginate } from '@/utils/pagination';
import { Prisma } from '@prisma/client';
import { Request } from 'express';
import { z, ZodError } from 'zod';

class CategoryService {
  async getCategories(req: Request) {
    const { show, page, search } = req.query;
    try {
      if (!show && !page && !search) {
        const categories = await prisma.category.findMany({
          orderBy: { name: 'asc' },
          include: { image: true, sub_categories: true },
        });
        return categories;
      } else {
        const queries: Prisma.CategoryWhereInput = { OR: [{ name: { contains: String(search) } }] };
        const categories = await prisma.category.findMany({
          where: queries,
          orderBy: { name: 'asc' },
          include: { image: true, sub_categories: true },
          ...paginate(Number(show), Number(page)),
        });
        if (!categories) throw new InternalServerError('Unable to fetch data.');
        const count = await prisma.category.count({ where: queries });
        return { categories, totalPages: countTotalPage(count, Number(show)) };
      }
    } catch (error) {
      catchAllErrors(error);
    }
  }
  async getSubCategories(req: Request) {
    try {
      const data = await prisma.category.findFirst({
        where: { id: Number(req.params.id) },
        include: {
          sub_categories: true,
        },
      });
      return data;
    } catch (error) {
      catchAllErrors;
    }
  }
  async createCategory(req: Request) {
    try {
      const schema = z.string().min(4);
      const validate = schema.safeParse(req.body.name);
      if (!validate.success) throw new ZodError(validate.error.errors);
      const { file } = req;
      if (file && validate.success) {
        await prisma.$transaction(async (prisma) => {
          const image = await prisma.image.create(await imageCreate(req, 'category'));
          await prisma.category.create(categoryCreate(req, image.id));
        });
      } else {
        throw new BadRequestError('Image is required.');
      }
    } catch (error) {
      catchAllErrors(error);
    }
  }
  async updateCategory(req: Request) {
    try {
      const schema = z.string().min(4).optional();
      const validate = schema.safeParse(req.body.name);
      if (!validate.success) throw new ZodError(validate.error.errors);
      await prisma.$transaction(async (prisma) => {
        const { image_id } = await prisma.category.update(categoryUpdate(req));
        if (req.file) {
          await prisma.image.update(await imageUpdate(req, image_id || ''));
        }
      });
    } catch (error) {
      catchAllErrors(error);
    }
  }
  async createSubCategory(req: Request) {
    try {
      const { name, category_id } = req.body;
      const schema = z.string().min(4);
      const validate = schema.safeParse(req.body.name);
      if (!validate.success) throw new ZodError(validate.error.errors);
      await prisma.subCategory.create({
        data: {
          name,
          category_id: Number(category_id),
        },
      });
    } catch (error) {
      catchAllErrors(error);
    }
  }
  async updateSubCategory(req: Request) {
    try {
      const { name, category_id } = req.body;
      const schema = z.string().min(4).optional();
      const validate = schema.safeParse(req.body.name);
      if (!validate.success) throw new ZodError(validate.error.errors);
      await prisma.subCategory.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          name,
          category_id,
        },
      });
    } catch (error) {
      catchAllErrors(error);
    }
  }
  async deleteCategory(req: Request) {
    try {
      await prisma.$transaction(async (prisma) => {
        await prisma.subCategory.deleteMany({
          where: {
            category_id: Number(req.params.id),
          },
        });
        await prisma.category.delete({
          where: {
            id: Number(req.params.id),
          },
        });
      });
    } catch (error) {
      catchAllErrors(error);
    }
  }
  async deleteSubCategory(req: Request) {
    try {
      await prisma.subCategory.delete({
        where: { id: Number(req.params.id) },
      });
    } catch (error) {
      catchAllErrors(error);
    }
  }
}

export default new CategoryService();
