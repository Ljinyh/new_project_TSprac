import mongoose, { Schema } from 'mongoose';
import { Rooms } from '../interface/room';

const RoomSchema: Schema = new Schema({
    roomName: {type : String, required : true},
    ownerId: String,
    guestId: [String],
    emoji: String,
    roomCode: String,
    createdAt: Date,
});
RoomSchema.virtual('roomId').get(function() {
    return this._id.toHexString();
});
RoomSchema.set('toJSON', { virtuals: true });

export default mongoose.model<Rooms & Document>('Room', RoomSchema);