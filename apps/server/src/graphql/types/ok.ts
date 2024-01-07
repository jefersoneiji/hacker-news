import { booleanArg, extendType, nonNull, objectType } from 'nexus'
import { fromGlobalId, toGlobalId } from 'graphql-relay'

export const ok = objectType({
    name: 'ok',
    description: 'test type ok',
    definition(t) {
        t.nonNull.id('id', {
            description: 'the id of an object',
            resolve: (root: any , _args) => toGlobalId('ok', root.id)
        })
        t.nonNull.boolean('value')
    },
})

export const okQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.field('ok', {
            type: 'ok',
            description: 'test query of ok type',
            async resolve(_root:any, _args, ctx) {
                const result = await ctx.ok.findOne()
                return { id: result?._id.toString(), value: true }
            }
        })
    },
})

export const okMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('ok', {
            type: 'ok',
            description: 'test mutation of type ok',
            args: { value: nonNull(booleanArg()) },
            resolve(_, args, ctx) {
                return new ctx.ok({ value: args.value }).save()
            }
        })
    },
})