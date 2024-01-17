import { useMutation } from "react-relay"
import { useNavigate, useSearchParams } from "react-router-dom"
import { graphql } from "relay-runtime"
import type { tokenMutation as tokenMutationType } from "./__generated__/tokenMutation.graphql"
import { SubmitHandler, useForm } from "react-hook-form"

const tokenMutation = graphql`
    mutation tokenMutation($userId: ID!, $token: String!){
        validateOTP(userId: $userId, token: $token){
            token
        }
    }
`
type TToken = {
    token: string
}
export const Token = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm<TToken>()
    const [searchParams] = useSearchParams()
    const userId = searchParams.get('id')!

    const [commitMutation] = useMutation<tokenMutationType>(tokenMutation)
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<TToken> = (e: TToken) => {
        commitMutation({
            variables: {
                token: e.token,
                userId
            },
            onCompleted(response) {
                reset()
                localStorage.setItem('hn-token', response.validateOTP.token)
                navigate('/')
            }
        })
    }

    const onBackClick = () => navigate('login')
    return (
        <div className="container-fluid mt-3">
            <b>Two-Factor Authentication</b>
            <p className="mt-3">
                Open the two-step verification app on your mobile device to get your
                verification code.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    {...register('token', { required: true })}
                    autoComplete="off"
                    autoCapitalize="off"
                    autoFocus={true}
                    className="mt-3 mb-3"
                    placeholder="token" />
                {errors.token?.type === 'required' && <p className='text-danger' role='alert'>token is required</p>}
                <br />
                <br />
                <input
                    type='submit'
                    value="authenticate"
                    data-testid='authenticate'
                />
                <br />
                <br />
                <input
                    type='button'
                    value="back to login"
                    onClick={onBackClick}
                />
            </form>
        </div>
    )
}