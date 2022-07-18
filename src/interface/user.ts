import {Types} from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  customerId: string;
  name: string;
  nickname: string;
  email: string;
  password: string;
  birthDay: string;
  faceColor: string;
  eyes: string;
  snsId: string;
  provider: string;
}