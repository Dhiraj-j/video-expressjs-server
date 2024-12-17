import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  changePassword,
  getMe,
  updateAvatar,
  updateCoverImage,
  getUserchanneleProfile,
  getWathHistory,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

// Secure routes

router.route("/logout").post(verifyJwt, logoutUser);
router.route("/refreshToken").post(refreshAccessToken);
router.route("/changePassword").post(verifyJwt, changePassword);
router.route("/me").get(verifyJwt, getMe);
router.route("/updateAvatar").post(verifyJwt, upload.single, updateAvatar);
router
  .route("/updateCoverImage")
  .post(verifyJwt, upload.single, updateCoverImage);

router.route("/getchannel/:username").get(verifyJwt, getUserchanneleProfile);
router.route("/watch-history").get(verifyJwt, getWathHistory);

export default router;
