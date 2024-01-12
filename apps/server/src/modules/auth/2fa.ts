import { randomBytes } from 'node:crypto'
import { encode } from 'hi-base32'

const generateRandomBase32 = () => {
    const buffer = randomBytes(15)
    const base32 = encode(buffer).replace(/=/g, "").substring(0, 24)
    return base32
}