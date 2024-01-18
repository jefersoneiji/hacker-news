import { fromGlobalId, toGlobalId } from "graphql-relay";
import { extendType, idArg, objectType } from "nexus";

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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        t.nonNull.dateTime('createdAt')
        t.string('email')
        t.string('about')
        t.nonNull.int('karma')
        t.nonNull.string('password')
        t.nonNull.field('otp', {
            type: 'otp',
            description: 'otp fields from this user',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            async resolve(root: any, _, ctx) {
                const user = await ctx.user.findOne({ _id: root.id })
                if (!user) throw new Error("user does not exist!");
                return {
                    otp_auth_url: user.otp_auth_url,
                    otp_base32: user.otp_base32,
                    otp_enabled: user.otp_enabled,
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
            args: { userID: idArg() },
            async resolve(_, args, ctx) {
                let id = ""
                if (args.userID) {
                    id = fromGlobalId(args.userID).id
                }
                const res = await ctx.user.findOne({ _id: id || ctx.userId });
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
