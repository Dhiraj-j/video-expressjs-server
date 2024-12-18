import mongoose, { Schema } from "mongoose";

const tweetSchema = new Schema({
  tweet: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      comment: {
        type: String,
        required: true,
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});
