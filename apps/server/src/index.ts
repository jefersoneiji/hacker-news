import Koa from 'koa'
import Router from '@koa/router'
import { graphqlHTTP } from 'koa-graphql'
import cors from '@koa/cors'
import { schema } from './graphql/schema'

const app = new Koa()
const router = new Router()

router.all('/graphql',
    graphqlHTTP({
        schema,
        context: {},
        graphiql: true
    })
)

app
    .use(cors({ origin: '*' }))
    .use(router.routes())
    .use(router.allowedMethods())

const PORT = 4000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/graphql`))