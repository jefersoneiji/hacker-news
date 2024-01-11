import request, { gql } from "graphql-request";
import { expect, test } from "vitest";
import { NexusGenFieldTypes } from "../../../../nexus-typegen";

test.skip('should find post by its id', async () => {
    const query = gql`
        query getPost($postID: ID!){
            findPost(postID: $postID){
                title
                createdAt
                link
                votedByLoggedUser
                id
            }
        }
    `

    const result = await request<{findPost: NexusGenFieldTypes['post']}>(
        'http://localhost:4000/graphql',
        query,
        { postID: "cG9zdDo2NTljOTNjNjg0MjEzODFjZjQyODc1ZWM=" }
    )

    expect(result.findPost.link).toBeTypeOf("string")
    expect(result.findPost.votedByLoggedUser).toBeTypeOf("boolean")
    expect(result.findPost.id).toBeTypeOf("string")
    expect(result.findPost.createdAt).toBeTypeOf("string")
})