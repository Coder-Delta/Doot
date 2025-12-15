import { getIO } from "../config/socket.config.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//Send the sms to the all connected clint
const sendMessage = asyncHandler(async (req, res) => {
  const { message } = req.body;

  if (!message) {
    throw new ApiError(400, "Message is required");
  }

  let io;
  try {
    io = getIO();
  } catch (err) {
    throw new ApiError(500, err.message);
  }

  io.emit("message", {
    message,
    sender: req.user?._id || "anonymous",
  });

  return res
    .status(200)
    .json(new ApiResponse(200,message,"Message sent successfully"));
});

export { sendMessage };
