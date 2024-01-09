import { toGlobalId } from "graphql-relay";
import { extendType, nonNull, objectType, stringArg } from "nexus";

export const post = objectType({
    name: 'post',
    description: 'post type',
    definition(t) {
        t.nonNull.id('id', {
            description: 'the id of a post',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            resolve: (root: any) => toGlobalId('post', root.id)
        })
        t.nonNull.string('title')
        t.nonNull.dateTime('createdAt')
    },
})

export const createPost = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('post', {
            type: 'post',
            description: 'creates a user post',
            args: { title: nonNull(stringArg()) },
            resolve(_, args, ctx) {
                return new ctx.post({ title: args.title }).save()
            }
        })
    },
})

export const queryPosts = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field('posts', {
            type: 'post',
            description: 'returns several posts',
            resolve(_, _args, ctx) {
                return ctx.post.find()
            }
        })
    },
})