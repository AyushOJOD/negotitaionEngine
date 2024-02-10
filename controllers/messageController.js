import Message from "../models/messageModel.js";

export const addMessage = async (req, res, next) => {
  try {
    const { message, product } = req.body;

    const { sender, reciever } = req.params;

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
    const { sender, reciever } = req.params;

    const messages = await Message.find({
      users: { $all: [sender, reciever] },
    })
      .sort({ createdAt: -1 })
      .populate("sender", "userName");

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

export const getConvergence = async (req, res, next) => {
  try {
    const { sender, reciever } = req.params;

    const messages = await Message.find({
      users: { $all: [sender, reciever] },
    });

    let trueCount = 0;
    let falseCount = 0;

    messages.map((message) => {
      if (message.aggrement === true) {
        trueCount++;
      } else {
        falseCount++;
      }
    });

    const isConverging = trueCount > falseCount;

    res.status(200).json({ isConverging });
  } catch (error) {
    next(error);
  }
};
