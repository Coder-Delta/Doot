import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (c) => {
  const body = await c.req.parseBody();
  const { username, fullName, email, password } = body;

  if (!username || !email || !password || !fullName) {
    throw new ApiError(400, "All fields are required!");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists!");
  }

  const avatarFile = body.avatar;

  if (!avatarFile) {
    throw new ApiError(400, "Avatar is required");
  }

  const buffer = Buffer.from(await avatarFile.arrayBuffer());

  const avatar = await uploadOnCloudinary(buffer);

  const user = await User.create({
    username,
    fullName,
    email,
    password,
    avatar: avatar?.url || "",
  });

  return c.json(
    new ApiResponse(201, user, "User created successfully!"),
    201
  );
});

export default registerUser;
