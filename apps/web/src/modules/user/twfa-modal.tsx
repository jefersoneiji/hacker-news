import { graphql } from "relay-runtime"
import { Row } from "./profile.js"
import { useFragment, useMutation } from "react-relay"
import type { twfaModalMutation as twfaModalMutationType } from "./__generated__/twfaModalMutation.graphql.js"
import { FormEvent, useState } from "react"
import { toDataURL } from 'qrcode'
import { EnableTwfa } from "./enabletwfa.js"
import { twfaModalFragment$key } from "./__generated__/twfaModalFragment.graphql.js"
import { DisableTwfa } from "./disabletwfa.js"

const TwoFAFragment = graphql`
    fragment twfaModalFragment on user {
        otp {
            otp_auth_url
            otp_base32
            otp_enabled
        }
        id
    }
`

const TwoFAMutation = graphql`
    mutation twfaModalMutation {
        otp {
            otp_auth_url
            otp_base32
            otp_enabled
        }
    }
`
export const TwoFactorModal = ({ user }: { user: twfaModalFragment$key }) => {
    const [commitMutation] = useMutation<twfaModalMutationType>(TwoFAMutation)
    const [qrCode, setQrCode] = useState('')
    const [otpUrl, setOtpUrl] = useState('')
    const [otpBase32, setOtpBase32] = useState('')

    const onClick = () => {
        commitMutation({
            variables: {},
            onCompleted(response) {
                setOtpUrl(response.otp.otp_auth_url)
                toDataURL(response.otp.otp_auth_url).then(res => setQrCode(res))
                setOtpBase32(response.otp.otp_base32)
            },
        })
    }

    const data = useFragment(TwoFAFragment, user)
    const onSubmit = (e: FormEvent<HTMLElement>) => {
        e.preventDefault()
    }

    const [authCode, setAuthCode] = useState('')
    
    return (
        <>
            {data.otp.otp_enabled === false && <Row text="2fa">
                <input
                    className="mb-1"
                    type="button"
                    value={"enable"}
                    onClick={onClick}
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    style={{ fontSize: 13 }}
                />
            </Row>
            }
            {data.otp.otp_enabled && <DisableTwfa />}

            <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tab-index="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden={true}
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Two-Factor Authentication (2FA) </h1>
                            <button type="button" className="btn-close" data-bs-dismiss='modal' aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <SectionHeader text="Configuring Google Authenticator or Authy" />
                            <ol>
                                <li>Install Google Authenticator (IOS - Android) or Authy (IOS - Android).</li>
                                <li>In the authenticator app, select "+" icon.</li>
                                <li>Select "Scan a barcode (or QR code)" and use the phone's camera to scan this barcode.</li>
                            </ol>
                            <SectionHeader text="Scan QR Code" />
                            <img
                                className="mx-auto d-block"
                                src={qrCode}
                                alt="qrcode url"
                            />
                            <SectionHeader text="Or Enter Code Into Your App" />
                            <p>Secret Key: {otpBase32}</p>
                            <SectionHeader text="Verify Code" />
                            <p>For changing the setting, please verify the authentication code:</p>
                            <form onSubmit={onSubmit}>
                                <input
                                    type="text"
                                    value={authCode}
                                    autoComplete="off"
                                    autoCapitalize="off"
                                    onChange={(e) => setAuthCode(e.target.value)}
                                    placeholder="Authentication Code" />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type='button'
                                className="btn btn-white border"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <EnableTwfa
                                authCode={authCode}
                                setAuthCode={setAuthCode}
                                base32={otpBase32}
                                otpUrl={otpUrl}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
const SectionHeader = ({ text }: { text: string }) => {
    return (
        <>
            <h6 className="mt-1" style={{ color: 'var(--blaze-orange)' }}>{text}</h6>
            <hr className="mx-0  mt-0 mb-3" />
        </>
    )
}