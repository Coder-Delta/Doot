import { getIO } from "../config/socket.config.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Message from "../models/message.model.js";

//Send the sms to the all connected clint
const sendMessage = asyncHandler(async (req, res) => {
  const { message } = req.body;

  if (!message) {
    throw new ApiError(400, "Message is required");
  }
  console.log("User sending message:", req.user);

  //Save message to DB
  const newMessage = new Message({
    sender: req.user._id,
    content: message,
  });
  await newMessage.save();

  //Emit socket event
  const io = getIO();
  io.emit("message", {
    message,
    sender: req.user._id
  });

  return res.status(201).json(
    new ApiResponse(201, { message, sender: req.user._id }, "Message sent successfully")
  );
});


//Get all messages
const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find()
    .sort({ createdAt: -1 })
    .limit(50)
    .populate("sender", "username email");
  return res
    .status(200)
    .json(new ApiResponse(200, messages, "Messages fetched successfully"));
});

export {
  sendMessage,
  getMessages,  
};