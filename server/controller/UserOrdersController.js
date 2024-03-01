import userPurchaseModel from "../model/userPurchaseModel.js";

export const getOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const response = await userPurchaseModel.findOne({ userId });
    // console.log(response);
    if (response == null) {
      return res.status(200).json(0);
    }
    const orderId = response.orders[0].orderId;
    const paymentId = response.orders[0].paymentId;
    const allProductCost = response.orders[0].allProductCost;
    const cartProducts = response.orders[0].cartProducts;
    res.status(200).json({ orderId, paymentId, allProductCost, cartProducts });
  } catch (error) {
    console.log("okkkkk");
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
