import { extendType, nonNull, objectType, stringArg } from "nexus"
import { generateRandomBase32, totp } from "../../modules/auth/2fa"
import { NexusGenObjects } from "../../../nexus-typegen"

export const otp = objectType({
    name: 'otp',
    definition(t) {
        t.nonNull.string('otp_auth_url')
        t.nonNull.string('otp_base32')
        t.nonNull.boolean('otp_enabled')
    },
})

export const otpGenerate = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('otp', {
            type: 'otp',
            description: 'otp values used in 2FA',
            async resolve(_, _args, ctx) {
                if (!ctx.userId) throw new Error("user must be logged");

                const user = await ctx.user.findOne({ _id: ctx.userId })
                if (!user) throw new Error("user not found");

                const otp_base32 = generateRandomBase32()
                const otp_auth_url = totp(otp_base32, user.username).toString()

                await ctx.user.updateOne({ _id: ctx.userId }, { otp_auth_url, otp_base32 })

                return {
                    otp_auth_url,
                    otp_base32,
                    otp_enabled: false
                }
            }
        })
    },
})

export const otpEnable = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('enableOTP', {
            type: 'user',
            description: 'enables otp for a user',
            args: { token: nonNull(stringArg()) },
            async resolve(_, args, ctx) {
                if (!ctx.userId) throw new Error("user must be logged");

                const user = await ctx.user.findOne<NexusGenObjects['user'] & { otp_base32: string, username: string }>({ _id: ctx.userId })
                if (!user) throw new Error("user not found");

                const otp = totp(user.otp_base32, user.username)
                const isValid = otp.validate({ token: args.token })
                if (isValid === null) throw new Error("invalid token");

                await ctx.user.findOneAndUpdate({ _id: ctx.userId }, { otp_enabled: true })

                return user
            }
        })
    },
})