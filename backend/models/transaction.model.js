// _id:ID!
// userId: ID!
// description: String!
// paymentType: String!
// category:String!
// amount:Float!  
// location: String!
// date: String!

import mongoose from 'mongoose';
import User from './user.model.js';

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    paymentType: {
        type:String,
        enum: ["card","cash","UPI"],
        required:true
    },
    category: {
        type:String,
        enum: ["saving", "expense", "investment"],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        default: "Unknown"
    },
    date: {
        type: Date,
        required: true
    },
},{timestamp:true})

const Transaction = mongoose.model("Transaction", transactionSchema)

export default Transaction