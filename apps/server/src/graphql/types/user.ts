import { fromGlobalId, toGlobalId } from "graphql-relay";
import { extendType, idArg, nonNull, objectType, stringArg } from "nexus";

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

export const signup = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('signup', {
            type: 'user',
            description: 'signs up a user',
            args: { username: nonNull(stringArg()) },
            resolve(_, args, ctx) {
                return new ctx.user({ username: args.username }).save()
            }
        })
    },
})