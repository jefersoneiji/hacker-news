import { useNavigate } from "react-router-dom"
import { Row } from "./auth"
import { FormEvent, useState } from "react"
import { graphql } from "relay-runtime"
import { useMutation } from "react-relay"

const singupMutation = graphql`
    mutation signupMutation($username: String!, $password: String!){
        signup(username: $username, password: $password){
            token
        }
    }
`
export const Signup = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [commitMutation] = useMutation(singupMutation)

    const onSubmitSignin = (e: FormEvent<HTMLFormElement>) => {
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
        <>
            <div className="mt-3"><b>Create Account</b></div>
            <form onSubmit={onSubmitSignin}>
                <Row text="username:">
                    <input
                        type='text'
                        autoCorrect="off"
                        spellCheck={false}
                        autoCapitalize="off"
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
                    type='submit'
                    value="create account"
                    className="mt-4"
                    style={{ fontSize: 13 }}
                />
            </form>
        </>
    )
}