import mongoose, { Schema, Document } from "mongoose";
import { IUser } from '../interface/user';

const UserSchema: Schema = new Schema (
  {
    customerId: { type: String },
    name: { type: String },
    nickname: { type: String },
    email: { type: String },
    password: { type: String },
    birthDay: { type: String },
    faceColor: { type: String },
    eyes: { type: String },
    snsId: { type: String },
    provider: { type: String },
  },
  { timestamps: true,}
);

UserSchema.virtual("userId").get(function () {
  return this._id.toHexString();
});

UserSchema.set("toJSON", { virtuals: true });

export default mongoose.model<IUser & Document>("User", UserSchema);
