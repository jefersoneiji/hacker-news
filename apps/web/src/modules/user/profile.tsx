import { useSearchParams } from "react-router-dom"
import { FormEvent, ReactNode } from 'react'
import { graphql } from "relay-runtime"
import { useLazyLoadQuery } from "react-relay"
import dayjs, { extend } from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
extend(relativeTime)

import { Header } from "../../components/header/header"
import { useShrink } from "../../utils/useShrink"
import { profileQuery as profileQueryType } from "./__generated__/profileQuery.graphql"
import { TwoFactorAuthenticationModal } from "./2fa-modal"

const profileQuery = graphql`
    query profileQuery($userID: ID!) {
        user(userID: $userID) {
            username
            createdAt
            email
            about
            karma
        }
    }
`
export const Profile = () => {
    const [searchParams] = useSearchParams()
    const userID = searchParams.get('id')
    const data = useLazyLoadQuery<profileQueryType>(profileQuery, { userID })

    const [shrink] = useShrink()
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    return (
        <div className='mx-auto' style={{ width: shrink ? '85%' : '' }}>
            <Header />
            <div className="container-fluid px-1 py-3" style={{ backgroundColor: 'var(--spring-wood)' }}>
                <Row text="user">
                    <span>{data.user.username}</span>
                </Row>
                <Row text="created">
                    <span>{dayjs(data.user.createdAt).fromNow()}</span>
                </Row>
                <Row text="karma">
                    <span style={{ color: 'var(--gray)' }}>{data.user.karma}</span>
                </Row>
                <Row text="2fa">
                    <input
                        className="mb-1"
                        type="button"
                        value={"enable"}
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        style={{ fontSize: 13 }}
                    />
                </Row>
                <TwoFactorAuthenticationModal />
                <form onSubmit={onSubmit}>
                    <Row text="about">
                        <textarea
                            value={data.user.about || ''}
                            onChange={() => undefined}
                            style={{ fontSize: 13 }}
                        />
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
                            value={data.user.email || ''}
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