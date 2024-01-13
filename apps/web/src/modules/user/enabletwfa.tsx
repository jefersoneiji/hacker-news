import { Dispatch, SetStateAction } from "react"
import { useMutation } from "react-relay"
import { graphql } from "relay-runtime"

const EnableTwfaMutation = graphql`
    mutation enabletwfaMutation(
            $token: String!,
            $otpUrl: String!,
            $otpBase32: String!
        ) {
        enableOTP(
            token: $token,
            otpUrl: $otpUrl,
            otpBase32: $otpBase32,
        ) {
            otp {
                otp_enabled
            }
            id
        }
    }
`

type TEnableTwfa = {
    authCode: string,
    setAuthCode: Dispatch<SetStateAction<string>>,
    base32: string,
    otpUrl: string
}
export const EnableTwfa = ({ authCode, setAuthCode, base32, otpUrl }: TEnableTwfa) => {
    const [commitMutation] = useMutation(EnableTwfaMutation)
    const onClick = () => {
        commitMutation({
            variables: {
                token: authCode,
                otpBase32: base32,
                otpUrl
            },
            onCompleted() {
                setAuthCode('')
            }
        })
    }
    return (
        <button
            type='button'
            className="btn"
            onClick={onClick}
            style={{
                backgroundColor: 'var(--blaze-orange)',
                color: 'var(--white)'
            }}
            data-bs-dismiss="modal"
        >
            Verify & Activate
        </button>
    )
}