import { expect, test } from 'vitest'
import request, { gql } from 'graphql-request'
import { NexusGenFieldTypes } from '../../../../nexus-typegen'

test('should create ok', async() => {
    const mutation = gql`
        mutation okMutation($value: Boolean!) {
            ok(value: $value) {
                value
                id
            }
        }
    `
    
    const result = await request<{ok: NexusGenFieldTypes['ok']}>('http://localhost:4000/graphql', mutation, {value: true})

    expect(result.ok.value).toBe(true)
    expect(result.ok.id).toBeTypeOf("string")
})