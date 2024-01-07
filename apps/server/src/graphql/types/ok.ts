import { booleanArg, extendType, nonNull, objectType } from 'nexus'

export const ok = objectType({
    name: 'ok',
    description: 'test type ok',
    definition(t) {
        t.nonNull.boolean('value')
    },
})

export const okQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.field('ok', {
            type: 'ok',
            description: 'test query of ok type',
            resolve() {
                return { value: true }
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