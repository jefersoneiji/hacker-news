import { fromGlobalId, toGlobalId } from "graphql-relay";
import { extendType, idArg, nonNull, objectType, stringArg } from "nexus";
import { user } from "../../modules/user/userModel";

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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        t.nonNull.dateTime('createdAt')
        t.nonNull.string('link')
        t.nonNull.boolean('votedByLoggedUser', {
            description: 'check if post was voted by logged user',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            async resolve(root: any, _args, ctx) {
                if (!ctx.userId) return false;
                return !!await ctx.post.findOne({ _id: root.id, voters: ctx.userId })
            }
        })
        t.nonNull.id('postedById', {
            description: 'id of post author',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            resolve(root: any) {
                return toGlobalId('user', root.postedById)
            }
        })
        t.nonNull.list.nonNull.field('comments', {
            type: 'comment',
            description: 'list of comments for a post',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            resolve(root: any, _args, ctx) {
                return ctx.comment.find({ postId: root.id })
            }
        })
        t.nonNull.field('author', {
            type: 'user',
            description: 'post\'s author',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            async resolve(root: any, _, ctx) {
                const author = await ctx.user.findOne({ _id: root.postedById })
                return author!
            }
        })
        t.nonNull.list.nonNull.field('voters', {
            type: 'user',
            description: 'users that voted this post',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            async resolve(root: any, _, ctx) {
                const post = await ctx.post.findOne({ _id: root.id })
                if (!post) throw new Error("post doesn't exist");

                const users = await ctx.user.aggregate([{ $match: { _id: { $in: post.voters } } }])
                return users.map(elem => ({ ...elem, id: elem._id.toString() })) as user[]
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
            args: {
                title: nonNull(stringArg()),
                link: nonNull(stringArg()),
                userId: nonNull(idArg())
            },
            resolve(_, args, ctx) {
                const userId = fromGlobalId(args.userId).id
                return new ctx.post({
                    title: args.title,
                    link: args.link,
                    postedById: userId
                }).save()
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
    }
})

export const vote = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('vote', {
            type: 'post',
            description: 'votes a post',
            args: { postId: nonNull(idArg()) },
            async resolve(_, args, ctx) {
                const id = fromGlobalId(args.postId).id
                const post = await ctx.post.findOneAndUpdate({ _id: id }, { $addToSet: { voters: ctx.userId } })
                if (!post) throw new Error("post doesn't exist");
                return post
            }
        })
    },
})