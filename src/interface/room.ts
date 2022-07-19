import {Types} from "mongoose";

export interface Rooms {
    _id: Types.ObjectId;
    roomName: string;
    ownerId: string;
    guestId: string;
    emoji: string;
    roomCode: string;
    createdAt: string;
};