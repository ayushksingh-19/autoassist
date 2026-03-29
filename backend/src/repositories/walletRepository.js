const Wallet = require("../models/Wallet");
const repo = require("../repositories/walletRepository");
const service = require("../services/walletService");

exports.addMoney = async (req, res, next) => {
  try {
    const { amount } = req.body;

    const wallet = await service.addMoney(req.user.id, amount);

    res.json({
      success: true,
      message: "Money added",
      data: wallet,
    });
  } catch (err) {
    next(err);
  }
};

exports.getWallet = async (req, res, next) => {
  try {
    const wallet = await service.getWallet(req.user.id);

    res.json({
      success: true,
      data: wallet,
    });
  } catch (err) {
    next(err);
  }
};
exports.addMoney = async (userId, amount) => {
  if (amount <= 0) {
    throw new Error("Invalid amount");
  }

  return await repo.addMoney(userId, amount);
};

exports.getWallet = async (userId) => {
  let wallet = await repo.findByUser(userId);

  if (!wallet) {
    wallet = await repo.createWallet(userId);
  }

  return wallet;
};
exports.findByUser = async (userId) => {
  return await Wallet.findOne({ userId });
};

exports.createWallet = async (userId) => {
  return await Wallet.create({ userId });
};

exports.addMoney = async (userId, amount) => {
  let wallet = await Wallet.findOne({ userId });

  if (!wallet) {
    wallet = await Wallet.create({ userId });
  }

  wallet.balance += amount;

  wallet.transactions.push({
    type: "credit",
    amount,
    description: "Wallet Top-up",
  });

  await wallet.save();

  return wallet;
};