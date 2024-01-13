import { useMutation } from "react-relay"
import { graphql } from "relay-runtime"

const EnableTwfaMutation = graphql`
    mutation enabletwfaMutation($token: String!) {
        enableOTP(token: $token) {
            otp {
                otp_enabled
            }
            id
        }
    }
`

export const EnableTwfa = ({ authCode }: { authCode: string }) => {
    const [commitMutation] = useMutation(EnableTwfaMutation)
    const onClick = () => {
        commitMutation({
            variables: {
                token: authCode
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