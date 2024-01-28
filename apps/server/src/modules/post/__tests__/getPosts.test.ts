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

    const result = await request<NexusGenFieldTypes['Query']>(process.env.API_URL!, query)

    expect(result.posts).length.greaterThanOrEqual(0)
})