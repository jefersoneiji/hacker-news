import request, { gql } from "graphql-request"
import { test, expect } from 'vitest'
import { NexusGenFieldTypes } from "../../../../nexus-typegen"

test('should login user sucessfully', async () => {
    const mutation = gql`
        mutation logUser($username: String!, $password: String!){
            login(username: $username, password: $password){
                token
            }
        }
    `

    const args = { username: "superjeferson", password: '123456' }
    const result = await request<NexusGenFieldTypes['Mutation']>(process.env.API_URL!, mutation, args)

    expect(result.login.token)
})