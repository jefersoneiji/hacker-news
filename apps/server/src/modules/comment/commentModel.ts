import mongoose, { Schema, Document } from "mongoose";

interface comment {
    comment: string; // String!
    createdAt: any; // DateTime!
    postId: string; // ID!
}
const commentSchema = new Schema({
    postId: { type: Schema.Types.ObjectId, required: true },
    comment: { type: String, required: true }
}, {
    timestamps: { createdAt: true, updatedAt: false }
})

type commentDocument = comment & Document

export const commentModel = mongoose.model<commentDocument>('comment', commentSchema)