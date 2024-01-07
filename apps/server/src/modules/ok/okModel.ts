import mongoose, { Schema, Document } from "mongoose";
import { NexusGenObjects } from "../../../nexus-typegen";

const okSchema = new Schema({
    value: Boolean
})

type okDocument = NexusGenObjects['ok'] & Document

export const okModel = mongoose.model<okDocument>('ok', okSchema)