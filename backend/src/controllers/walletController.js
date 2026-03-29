const service = require("../services/walletService");

exports.addMoney = async (req, res, next) => {
  try {
    const { amount } = req.body;

    const wallet = await service.addMoney(req.user.id, amount);

    res.json({
      success: true,
      message: "Money added successfully",
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
