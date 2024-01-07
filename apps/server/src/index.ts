import Koa from 'koa'
import Router from '@koa/router'
import { graphqlHTTP } from 'koa-graphql'
import cors from '@koa/cors'
import { GraphQLBoolean, GraphQLObjectType, GraphQLSchema } from 'graphql'

const app = new Koa()
const router = new Router()

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: 'query root',
        fields: () => ({
            ok: { type: GraphQLBoolean, resolve: () => true }
        })
    })
})

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