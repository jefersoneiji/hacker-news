import mongoose, { Schema, Document } from "mongoose";
import { NexusGenObjects } from "../../../nexus-typegen";

const userSchema = new Schema({
    username: { type: String, required: true }
})

type userDocument = NexusGenObjects['user'] & Document

export const userModel = mongoose.model<userDocument>('user', userSchema)