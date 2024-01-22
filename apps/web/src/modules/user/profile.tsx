import { useSearchParams } from "react-router-dom"
import { FormEvent, ReactNode, useEffect, useState } from 'react'
import { graphql } from "relay-runtime"
import { useLazyLoadQuery } from "react-relay"
import { jwtVerify } from "jose"
import dayjs, { extend } from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
extend(relativeTime)

import { Header } from "../../components/header/header"
import { useShrink } from "../../utils/useShrink"
import { profileQuery as profileQueryType } from "./__generated__/profileQuery.graphql"
import { TwoFactorModal } from "./twfa-modal"
import { fromGlobalId } from "graphql-relay"

const profileQuery = graphql`
    query profileQuery($userID: ID!) {
        user(userID: $userID) {
            username
            createdAt
            email
            about
            karma
            ...twfaModalFragment
        }
    }
`
export const Profile = () => {
    const [searchParams] = useSearchParams()
    const userID = searchParams.get('id')!
    const data = useLazyLoadQuery<profileQueryType>(profileQuery, { userID })

    const [shrink] = useShrink()
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    const [isSeer, setIsSeer] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('hn-token')
        if (userID && token) {
            (async () => {
                const queryId = fromGlobalId(userID)
                const rawUserId = await jwtVerify(token, new TextEncoder().encode(import.meta.env.VITE_APP_SECRET))
                const areEqual = queryId.id !== rawUserId.payload.userId
                setIsSeer(areEqual)
            })()
        }

    }, [userID])
    
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
                {isSeer === true &&
                    <Row text="about">
                        <TextAreaReadOnly text={data.user.about} />
                    </Row>
                }
                {isSeer === false &&
                    <>
                        <TwoFactorModal user={data.user} />
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
                    </>
                }
            </div>
        </div >
    )
}

export const Row = ({ text, children }: { text: string, children: ReactNode }) => {
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

const TextAreaReadOnly = ({ text }: { text?: string | null }) => {
    return (
        <p>{text || ''}</p>
    )
}