import { okModel } from "../modules/ok/okModel";

export interface Context {
    ok: typeof okModel
}

export const context: Context = ({
    ok: okModel
})