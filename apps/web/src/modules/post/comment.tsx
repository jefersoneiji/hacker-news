import { Link } from "react-router-dom"
import dayjs, { extend } from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
extend(relativeTime)

import triangle from '../../components/home-row/triangle.svg'
import { graphql } from "relay-runtime"
import { useFragment } from "react-relay"
import { commentFragment$key } from "./__generated__/commentFragment.graphql"

const commentFragment = graphql`
    fragment commentFragment on post {
        comments {
            comment
        }
    }
`
export const Comment = ({ post }: { post: commentFragment$key }) => {
    const data = useFragment(commentFragment, post)

    return (
        <>
            {data.comments.map((elem, idx) =>
                <Row
                    key={idx}
                    comment={elem.comment} />
            )}
        </>
    )
}

const Row = ({ comment }: { comment: string }) => {
    const voted = false
    const data = { link: 'https://localhost:4000', title: 'OpenBSD Cinnamon', createdAt: new Date() }
    return (
        <div className="d-flex flex-row py-2 mt-1" style={{ fontSize: 14 }}>
            <div className="d-flex align-items-center align-self-start" style={{ color: 'var(--gray)' }}>
                {!voted &&
                    <img
                        onClick={() => undefined}
                        className='mt-1'
                        src={triangle}
                        width={12}
                        height={12}
                        style={{ marginRight: 4 }}
                    />}
                {voted && <span style={{ marginRight: 16 }} />}
            </div>
            <div className="d-flex flex-column">
                <div className='d-flex flex-row align-items-end'>
                    <Link to='/' className='link ms-1'>jefersoneiji</Link>
                    <Link to='/' className='link ms-1'>{dayjs(data.createdAt).fromNow()}</Link>

                    <Link to='/' className='link ms-1'>| next [–]</Link>
                </div>
                <p className='text-dark text-decoration-none mt-1 my-0'>
                    {comment}
                </p>
            </div>
        </div >
    )
}