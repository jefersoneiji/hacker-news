import Koa from 'koa'
import Router from '@koa/router'
import { graphqlHTTP } from 'koa-graphql'
import cors from '@koa/cors'
import { schema } from './graphql/schema'
import { context } from './graphql/context'

export const app = new Koa()
const router = new Router()

console.clear()
router.all('/graphql',
    graphqlHTTP({
        schema,
        context,
        graphiql: true
    })
)

app
    .use(cors({ origin: '*' }))
    .use(router.routes())
    .use(router.allowedMethods())
