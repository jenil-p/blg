import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({ user: String, text: String }, { timestamps: true });

const postSchema = new mongoose.Schema({
  user: { type: String, required: true }, text: String, image: String,

  likes: [{ type: String }],

  comments: [commentSchema]

}, { timestamps: true });

export default mongoose.model("Post", postSchema);