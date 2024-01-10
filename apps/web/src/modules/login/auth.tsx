import { FormEvent, ReactNode } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Signup } from "./signup"

export const Auth = () => {
    const navigate = useNavigate()

    const onSubmitLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('login onSubmit triggered')
        navigate('/')
    }

    return (
        <div className="container-fluid">
            <b>Login</b>
            <form onSubmit={onSubmitLogin}>
                <Row text="username: ">
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
                        autoComplete="off"
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
            <Signup />
        </div>
    )
}

export const Row = ({ text, children }: { text: string, children: ReactNode }) => {
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