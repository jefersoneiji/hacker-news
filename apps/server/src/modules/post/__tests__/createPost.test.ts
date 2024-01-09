import request, { gql } from 'graphql-request'
import { expect, test } from 'vitest'

import { NexusGenFieldTypes } from '../../../../nexus-typegen'

test('should create a post', async () => {
    const mutation = gql`
        mutation post($title: String!, $link: String!){
            post(title: $title, link: $link) {
                title
                link
                createdAt
                votedByLoggedUser
            }
        }
        `
    const args = {
        title: 'Why does holding a key fob to your head increase its range?',
        link: "https://physics.stackexchange.com/questions/101913/why-does-a-remote-car-key-work-when-held-to-your-head-body"
    }

    const result = await request<{ post: NexusGenFieldTypes['post'] }>('http://localhost:4000/graphql', mutation, args)

    expect(result.post.title).toBe(args.title)
    expect(result.post.link).toBe(args.link)
    expect(result.post.createdAt).not.toBeNull()
    expect(result.post.id).not.toBeNull()
    expect(result.post.votedByLoggedUser).toBeFalsy()
})