import mongoose, { Schema } from 'mongoose';
import { Usersinter } from '../interface/usersRoom';

const UserRoomSchema: Schema = new Schema({
    userId: String,
    roomSeq: [String],
}, { timestamps: true });

UserRoomSchema.virtual('userRoomId').get(function() {
    return this._id.toHexString();
});
UserRoomSchema.set('toJSON', { virtuals: true });

export default mongoose.model<Usersinter & Document>('UsersRoom', UserRoomSchema);