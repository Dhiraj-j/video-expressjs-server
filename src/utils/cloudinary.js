import { v2 as cloudinary } from "cloudinary";
import fs, { unlink } from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
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
    console.log("file is uploaded on cloudinary", res.url);
    return res;
  } catch (error) {
    fs.unlinkSync(file); // delete file from local storage
    return null;
  }
};

export { uploadOnCloudinary };
