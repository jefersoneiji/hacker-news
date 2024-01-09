import request, { gql } from 'graphql-request'
import { expect, test } from 'vitest'

import { NexusGenFieldTypes } from '../../../../nexus-typegen'

test('should create a post', async () => {
    const mutation = gql`
        mutation post($title: String!){
            post(title: $title) {
                title
            }
        }
        `
    const result = await request<{ post: NexusGenFieldTypes['post'] }>('http://localhost:4000/graphql', mutation, { title: 'OpenBSD KDE Plasma Desktop' })

    expect(result.post.title).toBe('OpenBSD KDE Plasma Desktop')
    expect(result.post.id).not.toBeNull()
})