import request, { gql } from "graphql-request";
import { expect, test } from "vitest";
import { NexusGenFieldTypes } from "../../../../nexus-typegen";

test('should return created user', async () => {
    const mutation = gql`
    mutation createUser($username: String!, $password: String!){
        signup(username: $username, password: $password){
            username
            createdAt
            karma
            password
        }
    }
    `
    const args = { username: "johndoe", password: "bestsweever" }
    const result = await request<NexusGenFieldTypes['Mutation']>('http://localhost:4000/graphql', mutation, args)

    expect(result.signup.username).toEqual(args.username)
    expect(result.signup.createdAt).not.toBeNull()
    expect(result.signup.password).toBeTypeOf("string")
    expect(result.signup.karma).toEqual(0)
})