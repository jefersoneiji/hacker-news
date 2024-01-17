import { ReactNode } from "react"
import { Link, useNavigate } from "react-router-dom"
import { graphql } from "relay-runtime"
import { useMutation } from "react-relay"
import { SubmitHandler, useForm } from "react-hook-form"

import { Signup } from "./signup"
import type { authMutation as authMutationType } from "./__generated__/authMutation.graphql"

const authMutation = graphql`
    mutation authMutation($username: String!, $password: String!){
        login(username: $username, password: $password) {
            token 
            user {
                id
                otp {
                    otp_enabled
                }
            }
        }
    }
`

type TForm = {
    username: string
    password: string
}

export const Auth = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm<TForm>()
    const navigate = useNavigate()

    const [commitMutation] = useMutation<authMutationType>(authMutation)

    const onSubmitLogin: SubmitHandler<TForm> = (e: TForm) => {
        commitMutation({
            variables: {
                username: e.username,
                password: e.password
            },
            onCompleted(response) {
                reset()
                const { login } = response

                if (login.user.otp.otp_enabled) {
                    navigate(`/token?id=${login.user.id}`)
                    return;
                }
                localStorage.setItem('hn-token', login.token)
                navigate('/')
            }
        })
    }

    return (
        <div className="container-fluid">
            <b>Login</b>
            <form onSubmit={handleSubmit(onSubmitLogin)}>
                <Row text="username: ">
                    <input
                        type='text'
                        autoCorrect="off"
                        spellCheck={false}
                        autoCapitalize="off"
                        autoFocus={true}
                        size={20}
                        {...register('username', { required: true })}
                        style={{ fontSize: 13 }}
                    />
                    {errors.username?.type === 'required' && <p className='text-danger' role='alert'>username is required</p>}
                </Row>
                <Row text="password:">
                    <input
                        type='password'
                        autoComplete="off"
                        size={20}
                        style={{ fontSize: 13 }}
                        {...register('password', { required: true })}
                    />
                    {errors.password?.type === 'required' && <p className='text-danger' role='alert'>password is required</p>}
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