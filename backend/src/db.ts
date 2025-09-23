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
  contentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});


const LinkScehma = new Schema({
  hash : {type: String, unique: true},
  userId : {type: Schema.Types.ObjectId, ref: "User",required: true, unique: true},
})

const UserModel = model("User", UserSchema);
const ContentModel = model("Content", ContentSchema);
const LinkModel = model("Link", LinkScehma);

export { UserModel, ContentModel , LinkModel};
