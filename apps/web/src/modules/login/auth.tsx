import { ReactNode } from "react"
import { Link } from "react-router-dom"

export const Auth = () => {
    return (
        <div className="container-fluid">
            <b>Login</b>
            <form onSubmit={() => undefined}>
                <Row text="username:">
                    <input
                        type='text'
                        autoCorrect="off"
                        spellCheck={false}
                        autoCapitalize="off"
                        autoFocus={true}
                        value={""}
                        size={20}
                        onChange={() => undefined}
                        style={{ fontSize: 13 }}
                    />
                </Row>
                <Row text="password:">
                    <input
                        type='password'
                        value={""}
                        size={20}
                        onChange={() => undefined}
                        style={{ fontSize: 13 }}
                    />
                </Row>
                <input
                    type='submit'
                    value="login"
                    className="mt-4"
                    style={{ fontSize: 13 }}
                />
            </form>
            <div className="mt-2">
                <Link to='/'>Forgot your password?</Link>
            </div>
            <div className="mt-3"><b>Create Account</b></div>
            <form onSubmit={() => undefined}>
                <Row text="username:">
                    <input
                        type='text'
                        autoCorrect="off"
                        spellCheck={false}
                        autoCapitalize="off"
                        autoFocus={true}
                        value={""}
                        size={20}
                        onChange={() => undefined}
                        style={{ fontSize: 13 }}
                    />
                </Row>
                <Row text="password:">
                    <input
                        type='password'
                        value={""}
                        size={20}
                        onChange={() => undefined}
                        style={{ fontSize: 13 }}
                    />
                </Row>
                <input
                    type='submit'
                    value="create account"
                    className="mt-4"
                    style={{ fontSize: 13 }}
                />
            </form>
        </div>
    )
}

const Row = ({ text, children }: { text: string, children: ReactNode }) => {
    return (
        <div className="row pt-1">
            <div className="col-1">
                <span>{text}</span>
            </div>
            <div className="col">
                {children}
            </div>
        </div>
    )
}