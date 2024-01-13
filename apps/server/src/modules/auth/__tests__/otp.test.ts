import request, { gql } from "graphql-request";
import { expect, test } from "vitest";
import { NexusGenFieldTypes } from "../../../../nexus-typegen";
test('should generate otp and base32 codes', async () => {
    const mutation = gql`
        mutation GenerateOTP {
            otp {
                otp_auth_url
                otp_base32
                otp_enabled
            }
        }
        `
    const headers = { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWEwNTUyZTcyMjVmMTkzNDBmNTUzOTciLCJpYXQiOjE3MDUwODM1MjB9.JN0Omhko5TOyOb1NJbpSPRRucvnYddvJcG_vTNI6vQk" }

    const result = await request<{otp: NexusGenFieldTypes['otp']}>('http://localhost:4000/graphql', mutation, {}, headers)

    expect(result.otp.otp_auth_url).toBeTypeOf("string")
    expect(result.otp.otp_base32).toBeTypeOf("string")
    expect(result.otp.otp_enabled).toEqual(false)
})