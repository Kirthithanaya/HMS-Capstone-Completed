import sendEmail from "../utils/sendEmail.js";


export const sendPaymentReceipt = async (req, res) => {
  try {
    const { email, amount } = req.body;
    await sendEmail(email, "Payment Receipt", `Your payment of $${amount} was successful.`);
    res.status(200).json({ success: true, message: "Receipt Sent" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to Send Email", error });
  }
};
