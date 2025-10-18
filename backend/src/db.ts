import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String },
});

const ContentSchema = new Schema({
  link: { type: String },
  type: { type: String },
  title: { type: String },
  tags: { type: Schema.Types.ObjectId, ref: "Tag" },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});


const LinkSchema = new Schema({
  hash: { type: String, unique: true, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
})

const UserModel = model("User", UserSchema);
const ContentModel = model("Content", ContentSchema);
const LinkModel = model("Link", LinkSchema);

export { UserModel, ContentModel , LinkModel};
