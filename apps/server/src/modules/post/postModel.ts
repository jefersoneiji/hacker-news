import mongoose, { Schema } from "mongoose";
import { NexusGenObjects } from "../../../nexus-typegen";

const postSchema = new Schema({
    title: String
})

type postDocument = NexusGenObjects['post'] & Document

export const postModel = mongoose.model<postDocument>('post', postSchema)