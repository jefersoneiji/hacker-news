import mongoose, { Schema, Document } from "mongoose";

export interface user {
    about?: string | null; // String
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createdAt: any; // DateTime!
    email?: string | null; // String
    karma: number; // Int!
    password: string; // String!
    username: string; // String!
}

export const userSchema = new Schema({
    username: { type: String, required: true },
    email: String,
    about: String,
    karma: { type: Number, required: true, default: 0 },
    password: { type: String, required: true },
    comments: { type: [{ type: Schema.Types.ObjectId, ref: 'comment' }] },
    otp_auth_url: { type: String, default: '' },
    otp_base32: { type: String, default: '' },
    otp_enabled: { type: Boolean, default: false }
},
    { timestamps: { createdAt: true, updatedAt: false } }
)

type OTP = {
    otp_base32: string,
    otp_auth_url: string,
    otp_enabled: boolean
}
export type userDocument = user & Document & OTP

export const userModel = mongoose.model<userDocument>('user', userSchema)