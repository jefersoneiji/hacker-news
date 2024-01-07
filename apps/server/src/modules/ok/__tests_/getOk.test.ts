import { expect, test } from 'vitest'
import request, { gql } from 'graphql-request'
import { NexusGenFieldTypes } from '../../../../nexus-typegen'

test('should get ok', async() => {
    const query = gql`
        query okQuery {
            ok {
                value
                id
            }
        }
    `
    
    const result = await request<{ok: NexusGenFieldTypes['ok']}>('http://localhost:4000/graphql', query)

    expect(result.ok.value).toBeTypeOf("boolean")
    expect(result.ok.id).toBeTypeOf("string")
})