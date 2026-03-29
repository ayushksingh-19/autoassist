const repo = require("../repositories/walletRepository");

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