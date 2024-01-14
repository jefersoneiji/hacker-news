import { useMutation } from "react-relay"
import { graphql } from "relay-runtime"
import { Row } from "./profile"

const DisableTwfaMutation = graphql`
    mutation disabletwfaMutation {
        disableOTP {
            otp {
                otp_enabled
            }
            id
        }
    }
`

export const DisableTwfa = () => {
    const [commitMutation] = useMutation(DisableTwfaMutation)
    const onClick = () => {
        commitMutation({
            variables: {},
        })
    }
    return (
        <Row text="2fa">
            <input
                className="mb-1"
                type="button"
                value={"disable"}
                onClick={onClick}
                style={{ fontSize: 13 }}
            />
        </Row>
    )
}