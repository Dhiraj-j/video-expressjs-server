import { v2 as cloudinary } from "cloudinary";
import fs, { unlink } from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (file) => {
  try {
    if (!file) return null;
    // upload file on cloudinary
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return res;
  } catch (error) {
    console.log("TCL: uploadOnCloudinary -> error", error);
    fs.unlinkSync(file); // delete file from local storage
    return null;
  }
};

export { uploadOnCloudinary };
