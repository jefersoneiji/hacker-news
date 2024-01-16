import mongoose, { Schema, Document } from "mongoose";

interface post {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createdAt: any; // DateTime!
    link: string; // String!
    postedById: string; // ID!
    title: string; // String!
    votedByLoggedUser: boolean; // Boolean!
}
const postSchema = new Schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    postedById: { type: Schema.Types.ObjectId, require: true },
    votedByLoggedUser: { type: Boolean, required: true, default: false }
},
    {
        timestamps: { createdAt: true, updatedAt: false }
    })

type postDocument = post & Document

export const postModel = mongoose.model<postDocument>('post', postSchema)