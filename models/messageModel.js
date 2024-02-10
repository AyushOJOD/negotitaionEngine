import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    users: {
      type: Array,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: [
      {
        text: {
          type: String,
          required: true,
        },
        aggrement: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Messages = new mongoose.model("Message", messageSchema);

export default Messages;
