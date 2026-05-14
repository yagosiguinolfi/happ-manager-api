import prisma from '../prismaClient.js';

export const findAll = async () => prisma.user.findMany();

export const findById = async (id) => prisma.user.findUnique({ where: { id } });

export const findByEmail = async (email) => prisma.user.findUnique({ where: { email } });

export const create = async (data) => prisma.user.create({ data });

export const update = async (id, data) =>
  prisma.user.update({ where: { id }, data });

export const deleteUser = async (id) =>
  prisma.user.delete({ where: { id } });
