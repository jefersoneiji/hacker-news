import { useSearchParams } from "react-router-dom"
import { FormEvent, ReactNode } from 'react'
import { Header } from "../../components/header/header"
import { useShrink } from "../../utils/useShrink"
import { graphql } from "relay-runtime"
import { useLazyLoadQuery } from "react-relay"
import { profileQuery as profileQueryType } from "./__generated__/profileQuery.graphql"

const profileQuery = graphql`
    query profileQuery {
        user {
            username
        }
    }
`
export const Profile = () => {
    const data = useLazyLoadQuery<profileQueryType>(profileQuery, {})

    const [searchParams] = useSearchParams()
    console.log('id is: ', searchParams.get('id'))

    const [shrink] = useShrink()
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    return (
        <div className='mx-auto' style={{ width: shrink ? '85%' : '' }}>
            <Header />
            <div className="container-fluid px-1 py-3" style={{ backgroundColor: 'var(--spring-wood)' }}>
                <form onSubmit={onSubmit}>
                    <Row text="user">
                        <span>{data.user.username}</span>
                    </Row>
                    <Row text="created">
                        <span>100 days ago</span>
                    </Row>
                    <Row text="karma">
                        <span style={{ color: 'var(--gray)' }}>1</span>
                    </Row>
                    <Row text="about">
                        <textarea />
                    </Row>
                    <div className="row">
                        <div className="col-1" />
                        <div className="col">
                            <span style={{ fontSize: 13, color: 'var(--gray)' }}>
                                Only admins see your email below. To share publicly, add to the 'about' box.
                            </span>
                        </div>
                    </div>

                    <Row text="e-mail">
                        <input
                            type='email'
                            value={'jeferson.eiji@icloud.com'}
                            autoCapitalize="off"
                            autoCorrect="off"
                            size={60}
                            onChange={() => undefined}
                            style={{ fontSize: 12 }}
                        />
                    </Row>
                    <input
                        type='submit'
                        value='update'
                        className="mt-5"
                        style={{ fontSize: 13 }}
                    />
                </form>
            </div>
        </div >
    )
}

const Row = ({ text, children }: { text: string, children: ReactNode }) => {
    return (
        <div className="row">
            <div className="col-1">
                <span style={{ color: 'var(--gray)' }}>{text}:</span>
            </div>
            <div className="col">
                {children}
            </div>
        </div>
    )
}