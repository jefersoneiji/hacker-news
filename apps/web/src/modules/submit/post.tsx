import { FormEvent, ReactNode, useEffect, useState } from "react"
import { HeaderNoMenu } from "./header-no-menu"
import { graphql } from "relay-runtime"
import { useMutation } from "react-relay"
import { useNavigate } from "react-router-dom"

import { useShrink } from "../../utils/useShrink"
import { jwtVerify } from "jose"
import { toGlobalId } from "graphql-relay"

const postMutation = graphql`
    mutation postMutation($title: String!, $link: String!, $userId: ID!){
        post(title: $title, link: $link, userId: $userId){
            title
            link
            id
        }
    }
`

export const Post = () => {
    const [shrink] = useShrink()

    const [title, setTitle] = useState('')
    const [link, setLink] = useState('')

    const [commitMutation] = useMutation(postMutation)
    const navigate = useNavigate()

    const [userId, setUserId] = useState('')
    useEffect(() => {
        const token = localStorage.getItem('hn-token') || ''
        jwtVerify(token, new TextEncoder().encode(import.meta.env.VITE_APP_SECRET)).then(res => setUserId(toGlobalId('post', res.payload.userId as string)))
        console.log('vite_app_secret is: ',import.meta.env.VITE_APP_SECRET)
        console.log('token is: ',token)
    }, [])
    
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        commitMutation({
            variables: { title, link, userId },
            onCompleted() {
                setTitle('')
                setLink('')
                navigate('/')
            }
        })
    }
    return (
        <div className='mx-auto' style={{ width: shrink ? '85%' : '' }}>
            <HeaderNoMenu />
            <div className="container-fluid px-1 pt-2" style={{ backgroundColor: 'var(--spring-wood)' }}>
                <form onSubmit={onSubmit}>
                    <Row text="title">
                        <input
                            type='text'
                            value={title}
                            autoCapitalize="off"
                            autoCorrect="off"
                            size={49}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{ fontSize: 12 }}
                        />
                    </Row>
                    <Row text="url">
                        <input
                            id="url"
                            type='url'
                            value={link}
                            autoCapitalize="off"
                            autoCorrect="off"
                            size={49}
                            onChange={(e) => setLink(e.target.value)}
                            style={{ fontSize: 12 }}
                        />
                    </Row>
                    <Row text="text">
                        <textarea
                            value={''}
                            rows={4}
                            cols={51}
                            wrap="virtual"
                            onChange={() => undefined}
                            style={{ fontSize: 12 }}
                        />
                    </Row>
                    <div className="row">
                        <div className="col-1" />
                        <div className="col">
                            <input
                                type='submit'
                                value="submit"
                                className="my-2"
                                style={{ fontSize: 13 }}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

const Row = ({ text, children }: { text: string, children: ReactNode }) => {
    return (
        <div className="row pt-1">
            <div className="col-1">
                <span style={{ color: 'var(--gray)' }}>{text}</span>
            </div>
            <div className="col">
                {children}
            </div>
        </div>
    )
}