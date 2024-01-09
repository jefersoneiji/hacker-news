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
                about
                email
            }
        }
    `
    const args = { userID: "dXNlcjo2NTlkYThmNjRlMDU4MGY4NWMwZDYxZTQ=" }
    const result = await request<{ user: NexusGenFieldTypes['user'] }>('http://localhost:4000/graphql', query, { userID: args.userID })

    expect(result.user.username).toBe('johndoe')
    expect(result.user.id).toBe(args.userID)
    expect(result.user.about).not.toBeUndefined()
    expect(result.user.email).toBeTypeOf('string')
})

test('should return list of users', async () => {
    const query = gql`
        query usersList {
            users {
                username
                id
            }
        }
    `
    const result = await request<NexusGenFieldTypes['Query']>('http://localhost:4000/graphql', query)

    expect(result.users).not.toBeNull()
})