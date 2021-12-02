import mongoose from 'mongoose';
const Schema:any = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Customerschema = new Schema({
    id: ObjectId,
    name: { type: String },
    email: { type: String }
});

export const Customer =  mongoose.model('Customer', Customerschema);