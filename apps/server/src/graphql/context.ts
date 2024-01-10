import { commentModel } from "../modules/comment/commentModel";
import { postModel } from "../modules/post/postModel";
import { userModel } from "../modules/user/userModel";

export interface Context {
    post: typeof postModel
    user: typeof userModel
    comment: typeof commentModel
}

export const context: Context = ({
    post: postModel,
    user: userModel,
    comment: commentModel
})