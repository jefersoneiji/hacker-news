import { expect, test } from 'vitest'
import request, { gql } from 'graphql-request'
import { NexusGenObjects } from '../../../../nexus-typegen'

test('should get ok', async() => {
    const query = gql`
        query okQuery {
            ok {
                value
            }
        }
    `
    
    const result = await request<{ok: NexusGenObjects['ok']}>('http://localhost:4000/graphql', query)

    expect(result.ok.value).toBe(true)
})