import { graphql } from 'relay-runtime'
import { Link, useNavigate } from 'react-router-dom'
import { useFragment, useMutation } from 'react-relay'
import dayjs, { extend } from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
extend(relativeTime)

import triangle from './triangle.svg'
import './home-row.css'
import type { rowFragment$key, } from './__generated__/rowFragment.graphql'
import type { rowMutation as rowMutationType } from './__generated__/rowMutation.graphql'

const homeRowFragment = graphql`
    fragment rowFragment on post {
        title
        createdAt
        link
        votedByLoggedUser
        id
        author {
            username
            id
        }
        comments {
            id
        }
        voters {
            username
        }
    }
`
type TRow = {
    post: rowFragment$key,
    idx: number
}

const rowMutation = graphql`
    mutation rowMutation($postId: ID!) {
        vote(postId: $postId) {
            id
            votedByLoggedUser
            voters {
                username
            }
        }
    }
`
export const HomeRow = ({ post, idx }: TRow) => {
    const data = useFragment(homeRowFragment, post)

    const [commitMutation] = useMutation<rowMutationType>(rowMutation)
    const navigate = useNavigate()

    const createVote = () => {
        const token = localStorage.getItem('hn-token')
        if (!token) {
            return navigate('/login')
        }

        commitMutation({
            variables: { postId: data.id }
        })
    }
    const { username, id } = data.author
    const voted = data.votedByLoggedUser
    const link = new URL(data.link)

    return (
        <div className="d-flex flex-row py-1" style={{ fontSize: 14 }}>
            <div className="d-flex align-items-center align-self-start">
                <span>{idx}.</span>
                {!voted && <img onClick={createVote} src={triangle} width={12} height={12} style={{ marginRight: 4 }} />}
                {voted && <span style={{ marginRight: 16 }} />}
            </div>
            <div className="d-flex flex-column">
                <div className='d-flex flex-row align-items-end'>
                    <Link to={data.link} className='text-dark text-decoration-none'>
                        {data.title}
                    </Link>
                    <a href='/' className='link ms-2' style={{ fontSize: 13 }}>({link.hostname})</a>
                </div>
                <div className='d-flex flex-row' style={{ fontSize: 12, color: 'var(--gray)' }}>
                    <span>{data.voters.length} points by <Link to={`/user?id=${id}`} className='link'>{username}</Link></span>
                    <Link to='/' className='link ms-1'>{dayjs(data.createdAt).fromNow()}</Link>
                    <Link to='/' className='link ms-1'>| hide |</Link>
                    <Link to={`/item?id=${data.id}`} className='link ms-1'>{data.comments.length} comments</Link>
                </div>
            </div>
        </div >
    )
}