import { toGlobalId } from "graphql-relay";
import { extendType, objectType } from "nexus";

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
            async resolve(_, _args, ctx) {
                const res = await ctx.user.findOne();
                if (!res) {
                    throw new Error("user not found");
                }
                return res;
            }
        })
    },
})