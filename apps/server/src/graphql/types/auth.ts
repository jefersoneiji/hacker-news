import { extendType, nonNull, objectType, stringArg } from "nexus";
import { compare, hash } from 'bcrypt'
import { sign } from "jsonwebtoken";
import { APP_SECRET } from "../context";

export const auth = objectType({
    name: 'auth',
    description: 'authentication type',
    definition(t) {
        t.nonNull.string('token')
        t.nonNull.field('user', {
            type: 'user',
            description: 'authenticated user'
        })
    },
})

export const signup = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('signup', {
            type: 'auth',
            description: 'signs up user',
            args: {
                username: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },
            async resolve(_, args, ctx) {
                const user = await ctx.user.findOne({ username: args.username })

                if (user) {
                    throw new Error("username already taken!");
                }

                const hashed_password = await hash(args.password, 10)

                const new_user = await new ctx.user({ username: args.username, password: hashed_password }).save()

                const token = sign({ userId: new_user._id.toString() }, APP_SECRET)

                return {
                    token,
                    user: new_user
                }
            }
        })
    },
})

export const login = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('login', {
            type: 'auth',
            description: 'log in an user',
            args: { username: nonNull(stringArg()), password: nonNull(stringArg()) },
            async resolve(_, args, ctx) {
                const user = await ctx.user.findOne({ username: args.username })
                if (!user) throw Error("user not found!")

                const valid = await compare(args.password, user.password)
                if (!valid) throw new Error("invalid credentials!");

                const token = sign({ userId: user._id.toString() }, APP_SECRET)
                
                return {
                    token,
                    user,

                }
            }
        })
    },
})