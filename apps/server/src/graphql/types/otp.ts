import { extendType, objectType } from "nexus"
import { generateRandomBase32, totp } from "../../modules/auth/2fa"

export const otp = objectType({
    name: 'otp',
    definition(t) {
        t.nonNull.string('otp_auth_url')
        t.nonNull.string('otp_base32')
    },
})

export const otpGenerate = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('otp', {
            type: 'otp',
            description: 'otp values used in 2FA',
            async resolve(_, _args, ctx) {
                if(!ctx.userId) throw new Error("user must be logged");
                
                const user = await ctx.user.findOne({ _id: ctx.userId })
                if(!user) throw new Error("user not found");
                
                const otp_base32 = generateRandomBase32()
                const otp_auth_url = totp(otp_base32, user.username).toString()                

                await ctx.user.updateOne({_id: ctx.userId},{otp_auth_url, otp_base32})
                
                return { otp_auth_url, otp_base32 }
            }
        })
    },
})