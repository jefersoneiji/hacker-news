import { extendType, idArg, nonNull, objectType, stringArg } from "nexus"
import { generateRandomBase32, totp } from "../../modules/auth/2fa"
import { fromGlobalId } from "graphql-relay"
import { sign } from "jsonwebtoken"
import { APP_SECRET } from "../context"

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
            args: {
                token: nonNull(stringArg()),
                otpUrl: nonNull(stringArg()),
                otpBase32: nonNull(stringArg()),
            },
            async resolve(_, args, ctx) {
                if (!ctx.userId) throw new Error("user must be logged");

                const user = await ctx.user.findOne({ _id: ctx.userId })
                if (!user) throw new Error("user not found");

                const otp = totp(args.otpBase32, user.username)
                const isValid = otp.validate({ token: args.token })
                if (isValid === null) throw new Error("invalid token");

                await ctx.user.findOneAndUpdate(
                    { _id: ctx.userId },
                    {
                        otp_auth_url: args.otpUrl,
                        otp_base32: args.otpBase32,
                        otp_enabled: true
                    }
                )

                return user
            }
        })
    },
})

export const optDisable = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('disableOTP', {
            type: 'user',
            description: 'disables otp for a user',
            async resolve(_, args, ctx) {
                if (!ctx.userId) throw new Error("user must be logged");

                const user = await ctx.user.findOneAndUpdate({ _id: ctx.userId }, { otp_enabled: false })
                if (!user) throw new Error("user not found");

                return user
            }
        })
    },
})

export const validateOTP = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('validateOTP', {
            type: 'auth',
            description: 'validates token from user during login',
            args: { userId: nonNull(idArg()), token: nonNull(stringArg()) },
            async resolve(_, args, ctx) {
                const id = fromGlobalId(args.userId).id
                const user = await ctx.user.findOne({ _id: id })

                if (!user) throw new Error("user not found!");

                const otp = totp(user.otp_base32, id)
                
                const delta = otp.validate({ token: args.token, window: 1 })
                if (delta === null) throw new Error("invalid token!");
                
                const token = sign({ userId: user._id.toString() }, APP_SECRET)
                
                return { token, user }
            }
        })
    },
})