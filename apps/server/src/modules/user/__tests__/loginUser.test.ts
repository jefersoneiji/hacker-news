import request, { gql } from "graphql-request"
import { test, expect } from 'vitest'
import { NexusGenFieldTypes } from "../../../../nexus-typegen"

test('should login user sucessfully', async () => {
    const mutation = gql`
        mutation logUser($username: String!, $password: String!){
            login(username: $username, password: $password){
                username
            }
        }
    `

    const args = { username: "jefersoneiji", password: '123456' }
    const result = await request<NexusGenFieldTypes['Mutation']>('http://localhost:4000/graphql', mutation, args)

    expect(result.login.username)
})