import { Link } from "react-router-dom"
import dayjs, { extend } from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
extend(relativeTime)

import triangle from '../../components/home-row/triangle.svg'
import { graphql } from "relay-runtime"
import { useFragment } from "react-relay"
import { displayFragment$key } from "./__generated__/displayFragment.graphql"

const postDisplayFragment = graphql`
fragment displayFragment on post {
    link
    title
    createdAt
    votedByLoggedUser
    comments {
        id
    }
}
`
export const PostDisplay = ({ post }: { post: displayFragment$key }) => {
    const data = useFragment(postDisplayFragment, post)
    const link = new URL(data.link)
    const voted = data.votedByLoggedUser

    return (
        <div className="d-flex flex-row py-1" style={{ fontSize: 14 }}>
            <div className="d-flex align-items-center align-self-start">
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
                    <Link to={data.link} className='text-dark text-decoration-none'>
                        {data.title}
                    </Link>
                    <a href='/' className='link ms-2' style={{ fontSize: 13 }}>({link.hostname})</a>
                </div>
                <div className='d-flex flex-row' style={{ fontSize: 12, color: 'var(--gray)' }}>
                    <span>50 points by <Link to='/' className='link'>jefersoneiji</Link></span>
                    <Link to='/' className='link ms-1'>{dayjs(data.createdAt).fromNow()}</Link>
                    <Link to='/' className='link ms-1'>| hide |</Link>
                    <Link to='/' className='link ms-1'>past |</Link>
                    <Link to='/' className='link ms-1'>favorite |</Link>
                    <Link to='/' className='link ms-1'>{data.comments.length} comments</Link>
                </div>
            </div>
        </div >
    )
}