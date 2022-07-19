import mongoose from "mongoose";

export interface Usersinter {
    _id: mongoose.Types.ObjectId;
    userId: string;
    roomSeq: Array<string>;
}