import Invoice from "../models/Invoice.js";
import Payment from "../models/Payment.js";

// Create an invoice
export const createInvoice = async (req, res) => {
    try {
      const { residentId, amount, dueDate, description } = req.body;
      const newInvoice = new Invoice({ residentId, amount, dueDate, description });
      await newInvoice.save();
      res.status(201).json({ success: true, message: "Invoice created successfully!", invoice: newInvoice });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  // Get all invoices
export const getInvoices = async (req, res) => {
    try {
      const invoices = await Invoice.find().populate('residentId');
      res.status(200).json({ success: true, invoices });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  // Process a payment
export const processPayment = async (req, res) => {
    try {
      const { invoiceId, residentId, amount, paymentMethod } = req.body;
      const payment = new Payment({ invoiceId, residentId, amount, paymentMethod });
      await payment.save();
  
      await Invoice.findByIdAndUpdate(invoiceId, { status: 'Paid' });
  
      res.status(200).json({ success: true, message: "Payment successful!", payment });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  