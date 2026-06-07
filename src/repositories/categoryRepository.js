import prisma from "../prismaClient";

export const findAll = async () => prisma.category.findMany();

export const findById = async (id) => prisma.category.findUnique({ where: { id } });

export const create = async (data) => prisma.category.create({ data });

export const update = async (id, data) =>
  prisma.category.update({ where: { id }, data });

export const deleteCategory = async (id) =>
  prisma.category.delete({ where: { id } });
