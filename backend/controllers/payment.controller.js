import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";

export const createCheckoutSession = async (req, res) => {
  // Stripe disabled for local development. Mock checkout session.
  try {
    const { products, couponCode } = req.body;
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty products array" });
    }
    let totalAmount = 0;
    products.forEach((product) => {
      totalAmount += product.price * (product.quantity || 1);
    });
    // Optionally handle coupon logic here
    res.status(200).json({ id: "mock_session_id", totalAmount });
  } catch (error) {
    console.error("Error processing checkout:", error);
    res
      .status(500)
      .json({ message: "Error processing checkout", error: error.message });
  }
};

export const checkoutSuccess = async (req, res) => {
  // Stripe disabled for local development. Actually create and store order in DB.
  try {
    const { products, totalAmount } = req.body;
    const userId = req.user?._id;
    if (!userId || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }
    const order = new Order({
      user: userId,
      products: products.map((product) => ({
        product: product._id,
        quantity: product.quantity,
        price: product.price,
      })),
      totalAmount,
      stripeSessionId: "mock_session_id",
    });
    await order.save();
    res.status(200).json({
      success: true,
      message: "Order created and stored in DB (mock payment).",
      orderId: order._id,
    });
  } catch (error) {
    console.error("Error processing successful checkout:", error);
    res.status(500).json({
      message: "Error processing successful checkout",
      error: error.message,
    });
  }
};

// Stripe coupon creation disabled for local development

async function createNewCoupon(userId) {
  await Coupon.findOneAndDelete({ userId });

  const newCoupon = new Coupon({
    code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discountPercentage: 10,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    userId: userId,
  });

  await newCoupon.save();

  return newCoupon;
}
