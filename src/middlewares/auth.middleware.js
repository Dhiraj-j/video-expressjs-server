import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const verifyJwt = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookie?.accessToken ||
      req.headers("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Not authorized, no token found");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const getUser = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    if (!getUser) {
      throw new ApiError(401, "Invalid access");
    }
    req.user = getUser;
    next();
  } catch (error) {
    throw new ApiError(401, error.message || "Invalid access");
  }
});
