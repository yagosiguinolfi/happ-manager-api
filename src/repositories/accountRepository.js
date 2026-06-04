import prisma from "../prismaClient.js";

export const list = async () => {
  return await prisma.account.findMany();
};

export const create = async (accountData) => {
  const { userId, name, balance } = accountData;

  if (!userId || !name) {
    throw new Error("userId and name are required");
  }

  return await prisma.account.create({
    data: {
      userId,
      name,
      balance: balance ? parseFloat(balance) : 0
    }
  });
};

export const getById = async (id) => {
  return await prisma.account.findUnique({
    where: { id }
  });
};

export const update = async (id, accountData) => {
  const account = await prisma.account.findUnique({
    where: { id }
  });

  if (!account) {
    throw new Error("Account not found");
  }

  return await prisma.account.update({
    where: { id },
    data: {
      ...(accountData.userId && { userId: accountData.userId }),
      ...(accountData.name && { name: accountData.name }),
      ...(accountData.balance !== undefined && { balance: parseFloat(accountData.balance) })
    }
  });
};

export const remove = async (id) => {
  const account = await prisma.account.findUnique({
    where: { id }
  });

  if (!account) {
    throw new Error("Account not found");
  }

  return await prisma.account.delete({
    where: { id }
  });
};
