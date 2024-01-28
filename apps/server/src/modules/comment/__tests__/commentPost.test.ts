import request, { gql } from "graphql-request";
import { expect, test } from "vitest";
import { NexusGenFieldTypes } from "../../../../nexus-typegen";

test('should comment a post', async () => {
    const mutation = gql`
        mutation commentPost($postId: ID!, $comment: String!,$userId: ID!){
            comment(postId: $postId, comment: $comment, userId: $userId){
                comment
                createdAt
                commenter {
                    id
                }
            }
        }
    `

    const args = {
        postId: "cG9zdDo2NTljOTNjNjg0MjEzODFjZjQyODc1ZWM=",
        comment: "Action movies deliver an adrenaline rush with intense sequences, jaw-dropping stunts, and relentless excitement. From gripping plotlines to spectacular visuals, they keep us on the edge of our seats. These cinematic experiences are a thrilling escape, offering a rollercoaster of emotions and unforgettable moments of heroism.",
        userId: "dXNlcjo2NTllYmJjYzdjNGUyNzZjYmFhZDc0NmY="
    }

    const result = await request<{comment: NexusGenFieldTypes['comment']}>(process.env.API_URL!, mutation, args)

    expect(result.comment.comment).toEqual(args.comment)
    expect(result.comment.createdAt).not.toBeNull()
    expect(result.comment.commenter!.id).toEqual(args.userId)
})