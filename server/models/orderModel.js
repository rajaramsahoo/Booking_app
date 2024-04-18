import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.ObjectId,
      ref: "userModel",
    },
    paymentIntentId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["succeeded", "failed"],
      default: "succeeded",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    items: [
      {
        name: String,
        price: Number,
        // quantity: Number,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("orderModel", orderSchema, "order");

// const orderSchema = new mongoose.Schema(
//   {
//     products: [
//       {
//         type: mongoose.ObjectId,
//         ref: "ProductsModel",
//       },
//     ],
//     payment: {},
//     buyer: {
//       type: mongoose.ObjectId,
//       ref: "userModel",
//     },
//     status: {
//       type: String,
//       default: "Not Process",
//       enum: ["Not Process", "Processing", "Shipping", "Delivered", "Cancel"],
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("orderModel", orderSchema, "order");
