import {Types} from "mongoose";

export interface Stores {
    _id: Types.ObjectId;
    userId: String;
    storeName: String;
    address: String;
    LatLon: String;
    createdAt: String;
}