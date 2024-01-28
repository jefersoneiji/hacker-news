import request, { gql } from 'graphql-request'
import { expect, test } from 'vitest'

import { NexusGenFieldTypes } from '../../../../nexus-typegen'
import { toGlobalId } from 'graphql-relay'

test('should create a post', async () => {
    const mutation = gql`
        mutation post($title: String!, $link: String!, $userId: ID!){
            post(title: $title, link: $link, userId: $userId) {
                title
                link
                createdAt
                votedByLoggedUser
                postedById
            }
        }
        `
    const args = {
        title: 'Why does holding a key fob to your head increase its range?',
        link: "https://physics.stackexchange.com/questions/101913/why-does-a-remote-car-key-work-when-held-to-your-head-body",
        userId: "dXNlcjo2NTllYmJjYzdjNGUyNzZjYmFhZDc0NmY="
    }

    const result = await request<{ post: NexusGenFieldTypes['post'] }>(process.env.API_URL!, mutation, args)

    expect(result.post.title).toBe(args.title)
    expect(result.post.link).toBe(args.link)
    expect(result.post.createdAt).not.toBeNull()
    expect(result.post.id).not.toBeNull()
    expect(result.post.votedByLoggedUser).toBeFalsy()
    expect(toGlobalId('user',result.post.postedById)).toEqual(args.userId)
})