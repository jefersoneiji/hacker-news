import mongoose, { Schema, Document } from "mongoose";
import { NexusGenObjects } from "../../../nexus-typegen";

const postSchema = new Schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    votedByLoggedUser: { type: Boolean, required: true, default: false }
},
    {
        timestamps: { createdAt: true, updatedAt: false }
    })

type postDocument = NexusGenObjects['post'] & Document

export const postModel = mongoose.model<postDocument>('post', postSchema)