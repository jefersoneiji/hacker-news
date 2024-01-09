import request, { gql } from "graphql-request";
import { expect, test } from "vitest";
import { NexusGenFieldTypes } from "../../../../nexus-typegen";

test('should return created user', async () => {
    const mutation = gql`
    mutation createUser($username: String!, $email: String){
        signup(username: $username, email: $email){
            username
            createdAt
            email
        }
    }
    `
    const args = { username: "johndoe", email: "john@email.com" }
    const result = await request<NexusGenFieldTypes['Mutation']>('http://localhost:4000/graphql', mutation, args)

    expect(result.signup.username).toEqual(args.username)
    expect(result.signup.createdAt).not.toBeNull()
    expect(result.signup.email).toBeTypeOf('string')
})