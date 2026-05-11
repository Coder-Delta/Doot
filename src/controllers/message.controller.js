import { getIO } from "../config/socket.config.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Message from "../models/message.model.js";

//Send message
const sendMessage = asyncHandler(async (req, res) => {
  const { messageContent, recipientID } = req.body;

  if (!messageContent || !recipientID) {
    throw new apiError(400, "Message content and recipient ID are required");
  }

  //Save message to DB
  const newMessage = new Message({
    sender: req.user._id,
    recipient: recipientID,
    content: messageContent,
  });
  await newMessage.save();

  // Populate sender and recipient info
  await newMessage.populate("sender", "username email");
  await newMessage.populate("recipient", "username email");

  //Emit socket event
  const io = getIO();
  io.emit("message", newMessage);

  return res.status(201).json(
    new apiResponse(201, newMessage, "Message sent successfully")
  );
});


//Get all messages
const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find()
    .sort({ createdAt: -1 })
    .limit(50)
    .populate("sender", "username email")
    .populate("recipient", "username email");
  return res
    .status(200)
    .json(new apiResponse(200, messages, "Messages fetched successfully"));
});

//Get message by ID
const getMessageById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new apiError(400, "Message ID is required");
  }

  const message = await Message.findById(id)
    .populate("sender", "username email")
    .populate("recipient", "username email");

  if (!message) {
    throw new apiError(404, "Message not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, message, "Message fetched successfully"));
});

//Mark message as read
const markMessageAsRead = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new apiError(400, "Message ID is required");
  }

  const message = await Message.findByIdAndUpdate(
    id,
    { isRead: true },
    { new: true }
  )
    .populate("sender", "username email")
    .populate("recipient", "username email");

  if (!message) {
    throw new apiError(404, "Message not found");
  }

  //Emit socket event for real-time update
  const io = getIO();
  io.emit("messageRead", {
    messageId: id,
    isRead: true,
  });

  return res
    .status(200)
    .json(new apiResponse(200, message, "Message marked as read successfully"));
});

export {
  sendMessage,
  getMessages,
  getMessageById,
  markMessageAsRead,
};