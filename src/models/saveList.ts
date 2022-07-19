import mongoose, { Schema } from 'mongoose';
import { SaveLists } from '../interface/savelist';

const SaveListSchema: Schema = new Schema({
    userId: String,
    roomId: String,
    storeId: String,
    comment: String,
    imgURL: [String],
    star: String,
    price: String,
    tag: [String],
    recommendMenu : [String],
    createdAt: Date,
});
SaveListSchema.virtual('saveId').get(function() {
    return this._id.toHexString();
});
SaveListSchema.set('toJSON', { virtuals: true });

export default mongoose.model<SaveLists & Document>('saveList', SaveListSchema);