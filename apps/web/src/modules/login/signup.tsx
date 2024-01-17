import { useNavigate } from "react-router-dom"
import { Row } from "./auth"
import { graphql } from "relay-runtime"
import { useMutation } from "react-relay"
import type { signupMutation as signupMutationType } from "./__generated__/signupMutation.graphql"
import { SubmitHandler, useForm } from "react-hook-form"

const singupMutation = graphql`
    mutation signupMutation($username: String!, $password: String!){
        signup(username: $username, password: $password){
            token
        }
    }
`

type TSignup = {
    username: string
    password: string
}
export const Signup = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm<TSignup>()
    const navigate = useNavigate()

    const [commitMutation] = useMutation<signupMutationType>(singupMutation)

    const onSubmitSignin: SubmitHandler<TSignup> = (e: TSignup) => {
        commitMutation({
            variables: {
                username: e.username,
                password: e.password
            },
            onCompleted(response) {
                localStorage.setItem('hn-token', response.signup.token)
                reset()
                navigate('/')
            }
        })
    }
    return (
        <>
            <div className="mt-3"><b>Create Account</b></div>
            <form onSubmit={handleSubmit(onSubmitSignin)}>
                <Row text="username:">
                    <input
                        type='text'
                        autoCorrect="off"
                        spellCheck={false}
                        autoCapitalize="off"
                        {...register('username', { required: true })}
                        size={20}
                        style={{ fontSize: 13 }}
                    />
                    {errors.username?.type === 'required' && <p className='text-danger' role='alert'>username is required</p>}
                </Row>
                <Row text="password:">
                    <input
                        type='password'
                        autoComplete="off"
                        {...register('password', { required: true })}
                        size={20}
                        style={{ fontSize: 13 }}
                    />
                    {errors.password?.type === 'required' && <p className='text-danger' role='alert'>password is required</p>}
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