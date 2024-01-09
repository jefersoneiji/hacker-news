import { postModel } from "../modules/post/postModel";
import { userModel } from "../modules/user/userModel";

export interface Context {
    post: typeof postModel
    user: typeof userModel
}

export const context: Context = ({
    post: postModel,
    user: userModel
})