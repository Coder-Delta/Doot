import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "@elysiajs/jwt";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary";
import mongoose from "mongoose";

const registerUser = asyncHandler(async (req, res) => {
  const { username, fullName, email, password } = req.body;

  if (!username || email || password) {
    throw new ApiError(404, "All fields are required!");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!existedUser) {
    throw new ApiError(404, "User already exist!");
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  const user = await User.create(username, email, password, fullName, avatar);
  return res
  .status(200)
  .json(
    new ApiResponse (201, user, "User created successfully!")
  )
});


export default registerUser