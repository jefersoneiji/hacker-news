import { Request } from "koa";
import { commentModel } from "../modules/comment/commentModel";
import { postModel } from "../modules/post/postModel";
import { userModel } from "../modules/user/userModel";
import { decodeAuthHeader } from "../modules/auth/decode";

export const APP_SECRET = 'SUPER_SECRET_HERE'

export interface Context {
    post: typeof postModel
    user: typeof userModel
    comment: typeof commentModel
    userId?: string;
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