import mongoose, { Schema } from "mongoose";
import { NexusGenObjects } from "../../../nexus-typegen";

const postSchema = new Schema({
    title: { type: String, required: true },
    link: {type: String, required: true}
},
    {
        timestamps: { createdAt: true, updatedAt: false }
    })

type postDocument = NexusGenObjects['post'] & Document

export const postModel = mongoose.model<postDocument>('post', postSchema)