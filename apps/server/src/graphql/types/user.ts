import { fromGlobalId, toGlobalId } from "graphql-relay";
import { extendType, idArg, nonNull, objectType } from "nexus";

export const user = objectType({
    name: 'user',
    description: 'platform user',
    definition(t) {
        t.nonNull.id('id', {
            description: 'an user\'s id',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            resolve: (root: any) => toGlobalId('user', root.id)
        })
        t.nonNull.string('username')
        t.nonNull.dateTime('createdAt')
        t.string('email')
        t.string('about')
        t.nonNull.int('karma')
        t.nonNull.string('password')
        t.nonNull.field('otp', {
            type: 'otp',
            description: 'otp fields from this user',
            async resolve(_root, _, ctx) {
                const user = await ctx.user.findOne<{
                    otp_auth_url: string, otp_base32: string
                }>({ _id: ctx.userId }).then(res => res!)

                return {
                    otp_auth_url: user.otp_auth_url,
                    otp_base32: user.otp_base32
                }
            }
        })
    },
})

export const userQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.field('user', {
            type: 'user',
            description: 'returns one user',
            args: { userID: nonNull(idArg()) },
            async resolve(_, args, ctx) {
                const id = fromGlobalId(args.userID).id
                const res = await ctx.user.findOne({ _id: id });
                if (!res) {
                    throw new Error("user not found");
                }
                return res;
            }
        })
    },
})

export const users = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field('users', {
            type: 'user',
            description: 'return an array of users',
            resolve(_, _args, ctx) {
                return ctx.user.find()
            }
        })
    },
})
