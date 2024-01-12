import { randomBytes } from 'node:crypto'
import { encode } from 'hi-base32'
import { TOTP } from 'otpauth'

export const generateRandomBase32 = () => {
    const buffer = randomBytes(15)
    const base32 = encode(buffer).replace(/=/g, "").substring(0, 24)
    return base32
}

export const totp = (base32_secret: string, username: string) => new TOTP({
    issuer: username,
    label: "Hacker-News",
    algorithm: "SHA1",
    digits: 6,
    secret: base32_secret,
});