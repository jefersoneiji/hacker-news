import mongoose, { Schema, Document } from "mongoose";
import { NexusGenObjects } from "../../../nexus-typegen";

const userSchema = new Schema({
    username: { type: String, required: true },
    email: String,
    about: String,
    karma: { type: Number, required: true, default: 0 },
    password: { type: String, required: true },
    comments: { type: [{ type: Schema.Types.ObjectId, ref: 'comment' }] }
},
    { timestamps: { createdAt: true, updatedAt: false } }
)

type userDocument = NexusGenObjects['user'] & Document

export const userModel = mongoose.model<userDocument>('user', userSchema)