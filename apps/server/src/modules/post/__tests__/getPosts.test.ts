import { expect, test } from 'vitest'
import request, { gql } from "graphql-request"
import { NexusGenFieldTypes } from "../../../../nexus-typegen"

test('should returns several posts', async () => {
    const query = gql`
        query getPosts {
            posts {
                id
                title
            }
        }
    `

    const result = await request<NexusGenFieldTypes['Query']>('http://localhost:4000/graphql', query)

    expect(result.posts).length.greaterThanOrEqual(0)
})