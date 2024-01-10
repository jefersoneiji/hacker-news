import { FormEvent, ReactNode, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Signup } from "./signup"
import { graphql } from "relay-runtime"
import { useMutation } from "react-relay"

const authMutation = graphql`
    mutation authMutation($username: String!, $password: String!){
        login(username: $username, password: $password) {
            username
        }
    }
`
export const Auth = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [commitMutation] = useMutation(authMutation)

    const onSubmitLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        commitMutation({
            variables: {
                username,
                password
            },
            onCompleted() {
                setUsername('')
                setPassword('')
                navigate('/')
            }
        })
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
                        value={username}
                        size={20}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ fontSize: 13 }}
                    />
                </Row>
                <Row text="password:">
                    <input
                        type='password'
                        autoComplete="off"
                        value={password}
                        size={20}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ fontSize: 13 }}
                    />
                </Row>
                <input
                    data-testid='login'
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