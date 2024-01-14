import { FormEvent, useState } from "react"
import { useMutation } from "react-relay"
import { useNavigate, useSearchParams } from "react-router-dom"
import { graphql } from "relay-runtime"
import type { tokenMutation as tokenMutationType } from "./__generated__/tokenMutation.graphql"

const tokenMutation = graphql`
    mutation tokenMutation($userId: ID!, $token: String!){
        validateOTP(userId: $userId, token: $token){
            token
        }
    }
`
export const Token = () => {
    const [searchParams] = useSearchParams()
    const userId = searchParams.get('id')

    const [userToken, setUserToken] = useState('')
    const [commitMutation] = useMutation<tokenMutationType>(tokenMutation)
    const navigate = useNavigate()

    const onSubmit = (e: FormEvent<HTMLElement>) => {
        e.preventDefault()
        
        commitMutation({
            variables: {
                token: userToken,
                userId
            },
            onCompleted(response) {
                setUserToken('')
                localStorage.setItem('hn-token', response.validateOTP.token)
                navigate('/')
            }
        })
    }

    const onBackClick = () => navigate('login')
    return (
        <div className="container-fluid mt-3">
            <b>Two-Factor Authentication</b>
            <p className="mt-3">
                Open the two-step verification app on your mobile device to get your
                verification code.
            </p>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={userToken}
                    autoComplete="off"
                    autoCapitalize="off"
                    className="mt-3 mb-3"
                    onChange={(e) => setUserToken(e.target.value)}
                    placeholder="token" />
                <br />
                <br />
                <input
                    type='submit'
                    value="authenticate"
                    data-testid='authenticate'
                />
                <br />
                <br />
                <input
                    type='button'
                    value="back to login"
                    onClick={onBackClick}
                />
            </form>
        </div>
    )
}