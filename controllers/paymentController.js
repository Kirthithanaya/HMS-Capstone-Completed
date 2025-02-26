import stripe from "../Database/stripe.js";
import Payment from "../models/Payment.js";

export const processPayment = async (req, res) => {
  try {
    const { amount, currency, token } = req.body;

    const charge = await stripe.charges.create({
      amount: amount * 100,
      currency,
      source: token.id,
      description: "Hostel Payment",
    });

    const payment = new Payment({
      userId: req.user.id,
      amount,
      currency,
      status: "Completed",
    });

    await payment.save();
    res.status(200).json({ success: true, message: "Payment Successful" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Payment Failed", error });
  }
};
