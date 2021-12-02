import mongoose from 'mongoose';
const Schema: any = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const schema = new Schema({
    id: ObjectId,
    open: { type: Boolean },
    maximumCapacity: { type: Number }
});

export const Queue = mongoose.model('Queue', schema)