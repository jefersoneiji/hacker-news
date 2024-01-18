import mongoose, { Schema, Document } from "mongoose";
import { user } from "../user/userModel";

interface comment {
    comment: string; // String!
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createdAt: any; // DateTime!
    postId: string; // ID!
    commenter: user[] | null; // user
    id: string; // ID!
}
const commentSchema = new Schema({
    postId: { type: Schema.Types.ObjectId, required: true },
    comment: { type: String, required: true },
    voters: { type: [{ type: Schema.Types.ObjectId, ref: 'user' }] }
}, {
    timestamps: { createdAt: true, updatedAt: false }
})

type commentDocument = comment & Document

export const commentModel = mongoose.model<commentDocument>('comment', commentSchema)