import request, { gql } from "graphql-request";
import { expect, test } from "vitest";
import { NexusGenFieldTypes } from "../../../../nexus-typegen";

test.skip('should return created user', async () => {
    const mutation = gql`
        mutation createUser($username: String!, $password: String!){
            signup(username: $username, password: $password){
                token
            }
        }
    `
    const args = { username: "johndoe", password: "bestsweever" }
    const result = await request<NexusGenFieldTypes['Mutation']>(process.env.API_URL!, mutation, args)

    expect(result.signup.token).toBeTypeOf('string')
})