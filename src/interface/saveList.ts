import {Types} from "mongoose";

export interface SaveLists {
    _id: Types.ObjectId;
    userId: string;
    roomId: string;
    storeId: string;
    comment: string;
    imgURL: string;
    star: string;
    price: string;
    tag: string;
    recommendMenu :string;
    createdAt: string,

}