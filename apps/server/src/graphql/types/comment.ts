import { fromGlobalId, toGlobalId } from "graphql-relay";
import { extendType, idArg, nonNull, objectType, stringArg } from "nexus";

export const comment = objectType({
    name: 'comment',
    description: 'comment type',
    definition(t) {
        t.nonNull.id('id', {
            description: 'id of a comment',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            resolve: (root: any) => toGlobalId('post', root.id)
        })
        t.nonNull.id('postId', {
            description: 'id of origin post'
        })
        t.nonNull.string('comment')
        //@ts-ignore
        t.nonNull.dateTime('createdAt')
        t.field('commenter', {
            type: 'user',
            description: 'user that created this comment',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            resolve(root: any, _, ctx) {
                return ctx.user.findOne({ comments: root.id, })
            }
        })
    },
})

export const commentPost = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('comment', {
            type: 'comment',
            description: 'comments a post',
            args: {
                postId: nonNull(idArg()),
                comment: nonNull(stringArg()),
                userId: nonNull(idArg())
            },
            async resolve(_, args, ctx) {
                const id = fromGlobalId(args.postId).id
                const new_comment = await new ctx.comment({
                    postId: id,
                    comment: args.comment
                }).save()

                const userId = fromGlobalId(args.userId).id
                await ctx.user.findOneAndUpdate({ _id: userId }, { $addToSet: { comments: new_comment._id } })

                return new_comment
            }
        })
    },
})