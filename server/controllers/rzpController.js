import razorpay from "razorpay";
import orderModel from "../models/orderModel.js";

//@desc create razorpay order
//route /api/v1/paymemt/rzpPayment
//access private
const rzpPayment = async (req, res) => {
  try {
    const options = {
      amount: 50000, // amount in smallest currency unit
      currency: "INR",
      receipt: "receipt_order_74394",
    };

    const rzpInstance = new razorpay({
      key_id: process.env.RAZORPAY_ID_KEY,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });

    const rzpOrder = await rzpInstance.orders.create(options);

    if (!rzpOrder) {
      throw new Error("Something went wrong with Rzp order");
    }

    res.status(200).json(rzpOrder);
  } catch (error) {
    console.log(error);
  }
};

export { rzpPayment };
