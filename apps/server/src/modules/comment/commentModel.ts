import mongoose, { Schema, Document } from "mongoose";
import { NexusGenObjects } from "../../../nexus-typegen";

const commentSchema = new Schema({
    postId: { type: Schema.Types.ObjectId, required: true }
})

type commentDocument = NexusGenObjects['comment'] & Document

export const commentModel = mongoose.model<commentDocument>('comment', commentSchema)