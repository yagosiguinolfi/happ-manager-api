import prisma from '../prismaClient.js';

export const list = async (req, res) => {
  try {
    const accounts = await prisma.account.findMany();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching accounts" });
  }
};

export const create = async (req, res) => {
  try {
    const { userId, name, balance } = req.body;

    if (!userId || !name) {
      return res.status(400).json({ message: "userId and name are required" });
    }

    const account = await prisma.account.create({
      data: {
        userId,
        name,
        balance: balance ? parseFloat(balance) : 0
      }
    });
    res.status(201).json(account);
  } catch (error) {
    res.status(400).json({ message: "Error creating account" });
  }
};

export const getById = async (req, res) => {
  try {
    const account = await prisma.account.findUnique({
      where: { id: req.params.id }
    });
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    res.json(account);
  } catch (error) {
    res.status(500).json({ message: "Error fetching account" });
  }
};

export const update = async (req, res) => {
  try {
    const account = await prisma.account.findUnique({
      where: { id: req.params.id }
    });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    const updatedAccount = await prisma.account.update({
      where: { id: req.params.id },
      data: {
        ...(req.body.userId && { userId: req.body.userId }),
        ...(req.body.name && { name: req.body.name }),
        ...(req.body.balance !== undefined && { balance: parseFloat(req.body.balance) })
      }
    });
    res.json(updatedAccount);
  } catch (error) {
    res.status(400).json({ message: "Error updating account" });
  }
};

export const remove = async (req, res) => {
  try {
    const account = await prisma.account.findUnique({
      where: { id: req.params.id }
    });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    await prisma.account.delete({
      where: { id: req.params.id }
    });
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting account" });
  }
};
