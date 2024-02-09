import Message from "../models/messageModel.js";

export const addMessage = async (req, res, next) => {
  try {
    const { message, sender, reciever, product } = req.body;

    const newMessage = new Message({
      message,
      users: [sender, reciever],
      product,
      sender,
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};

export const getMessagebyId = async (req, res, next) => {
  try {
    const { sender, reciever } = req.body;

    const messages = await Message.find({
      users: { $all: [sender, reciever] },
    }).sort({ createdAt: -1 });

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

export const getConvergence = async (req, res, next) => {
  try {
    const { sender, reciever } = req.body;

    const messages = await Message.find({ $all: [sender, reciever] });
  } catch (error) {
    next(error);
  }
};
