import mongoose, { Schema } from 'mongoose';
import { Stores } from '../interface/store';

const StoreSchema: Schema = new Schema({
    userId: String,
    storeName: String,
    address: String,
    LatLon: [Number],
    createdAt: Date,
});
StoreSchema.virtual('storeId').get(function() {
    return this._id.toHexString();
});
StoreSchema.set('toJSON', { virtuals: true });

export default mongoose.model<Stores & Document>('store', StoreSchema);