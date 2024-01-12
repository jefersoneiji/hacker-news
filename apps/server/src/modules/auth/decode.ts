import { verify } from "jsonwebtoken";
import { APP_SECRET } from "../../graphql/context";

interface AuthTokenPayload {
    userId: string
}
export const decodeAuthHeader = (authHeader: string): AuthTokenPayload => {
    const token = authHeader.replace('Bearer ', "")

    if (!token) throw new Error("no token found!");

    return verify(token, APP_SECRET) as AuthTokenPayload
}
