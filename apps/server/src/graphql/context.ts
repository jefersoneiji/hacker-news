import { okModel } from "../modules/ok/okModel";
import { postModel } from "../modules/post/postModel";

export interface Context {
    ok: typeof okModel
    post: typeof postModel
}

export const context: Context = ({
    ok: okModel,
    post: postModel
})