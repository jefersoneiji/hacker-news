import { Request } from "koa";
import { commentModel } from "../modules/comment/commentModel";
import { postModel } from "../modules/post/postModel";
import { userModel } from "../modules/user/userModel";
import { verify } from "jsonwebtoken";

export const APP_SECRET = 'SUPER_SECRET_HERE'

export interface Context {
    post: typeof postModel
    user: typeof userModel
    comment: typeof commentModel
    userId?: string;
}

interface AuthTokenPayload {
    userId: string
}
const decodeAuthHeader = (authHeader: string): AuthTokenPayload => {
    const token = authHeader.replace('Bearer ', "")

    if (!token) throw new Error("no token found!");

    return verify(token, APP_SECRET) as AuthTokenPayload
}

export const context = ({ req }: { req: Request }): Context => {
    const token = req && req.headers.authorization ? decodeAuthHeader(req.headers.authorization) : null
    return {
        post: postModel,
        user: userModel,
        comment: commentModel,
        userId: token?.userId
    }
}