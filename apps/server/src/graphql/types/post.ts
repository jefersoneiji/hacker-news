import { fromGlobalId, toGlobalId } from "graphql-relay";
import { extendType, idArg, nonNull, objectType, stringArg } from "nexus";

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
        t.nonNull.string('link')
        t.nonNull.boolean('votedByLoggedUser')
        t.nonNull.list.nonNull.field('comments', {
            type: 'comment',
            description: 'list of comments for a post',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            resolve(root: any, _args, ctx) {
                return ctx.comment.find({ postId: root.id })
            }
        })
    },
})

export const createPost = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('post', {
            type: 'post',
            description: 'creates a user post',
            args: { title: nonNull(stringArg()), link: nonNull(stringArg()) },
            resolve(_, args, ctx) {
                return new ctx.post({ title: args.title, link: args.link }).save()
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

export const onePost = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.field('findPost', {
            type: 'post',
            description: 'returns one specific post by its global id',
            args: { postID: nonNull(idArg()) },
            async resolve(_, args, ctx) {
                const id = fromGlobalId(args.postID).id
                const post = await ctx.post.findOne({ _id: id })
                if (!post) {
                    throw new Error("post not found");
                }
                return post
            }
        })
    },
})