export const TwoFactorAuthenticationModal = () => {
    return (
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
                        <p>QR CODE IMAGE HERE</p>
                        <SectionHeader text="Or Enter Code Into Your App" />
                        <p>SECRET KEY HERE</p>
                        <SectionHeader text="Verify Code" />
                        <p>For changing the setting, please verify the authentication code:</p>
                        <p>AUTHENTICATION INPUT BELLOW</p>
                    </div>
                    <div className="modal-footer">
                        <button
                            type='button'
                            className="btn btn-white border"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            type='button'
                            className="btn"
                            style={{
                                backgroundColor: 'var(--blaze-orange)',
                                color: 'var(--white)'
                            }}
                            data-bs-dismiss="modal"
                        >
                            Verify & Activate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
const SectionHeader = ({ text }: { text: string }) => {
    return (
        <>
            <h6 className="mt-1" style={{ color: 'var(--blaze-orange)' }}>{text}</h6>
            <hr />
        </>
    )
}