import { useNavigate } from "react-router-dom"
import { Row } from "./auth"
import { FormEvent } from "react"

export const Signup = () => {
    const navigate = useNavigate()
    
    const onSubmitSignin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('login onSubmit triggered')
        navigate('/')
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
                    value="create account"
                    className="mt-4"
                    style={{ fontSize: 13 }}
                />
            </form>
        </>
    )
}