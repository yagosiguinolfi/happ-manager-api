import prisma from '../prismaClient.js';

export const findAll = async () => prisma.user.findMany();
export const findById = async (id) => prisma.user.findUnique({ where: { id } });
export const create = async (data) => prisma.user.create({ data });
