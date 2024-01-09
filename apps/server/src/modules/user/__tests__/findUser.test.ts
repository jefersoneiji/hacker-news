import request, { gql } from "graphql-request";
import { expect, test } from "vitest";
import { NexusGenFieldTypes } from "../../../../nexus-typegen";

test.skip('should thrown error when user is not found', async () => {
    const query = gql`
        query getUser {
            user {
                username
            }
        }
    `
    const result = request<NexusGenFieldTypes['Query']>('http://localhost:4000/graphql', query)

    await expect(result).rejects.toThrowError('user not found')
})

test('should return one user from its id', async () => {
    const query = gql`
        query getUser($userID: ID!) {
            user(userID: $userID) {
                username
                id
            }
        }
    `
    const args = { userID: "dXNlcjo2NTlkN2ZhNTFkNDI4ZmFjZTkyM2YwZmM=" }
    const result = await request<{ user: NexusGenFieldTypes['user'] }>('http://localhost:4000/graphql', query, { userID: args.userID })

    expect(result.user.username).toBe('johndoe')
    expect(result.user.id).toBe(args.userID)
})