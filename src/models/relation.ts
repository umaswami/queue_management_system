import mongoose from 'mongoose';
const Schema: any = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const schema = new Schema({
    id: ObjectId,
    userId: { type: String },
    queueId: { type: String },
    position: { type: Number }
});

export const Relation = mongoose.model('Relation', schema)