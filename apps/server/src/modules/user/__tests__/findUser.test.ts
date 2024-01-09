import request, { gql } from "graphql-request";
import { expect, test } from "vitest";
import { NexusGenFieldTypes } from "../../../../nexus-typegen";

test.skip('should thrown error when user is not found', async () => {
    const query = gql`
        query getUser {
            user {
                username
            }
        }
    `
    const result = request<NexusGenFieldTypes['Query']>('http://localhost:4000/graphql', query)

    await expect(result).rejects.toThrowError('user not found')
})