import { graphql } from 'relay-runtime'
import { Link } from 'react-router-dom'
import { useFragment } from 'react-relay'
import dayjs, { extend } from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
extend(relativeTime)

import triangle from './triangle.svg'
import './home-row.css'
import { rowFragment$key } from './__generated__/rowFragment.graphql'

const homeRowFragment = graphql`
    fragment rowFragment on post {
        title
        createdAt
        link
        votedByLoggedUser
        id
        comments {
            id
        }
    }
`
type TRow = {
    post: rowFragment$key,
    idx: number
}

export const HomeRow = ({ post, idx }: TRow) => {
    const data = useFragment(homeRowFragment, post)

    const voted = data.votedByLoggedUser
    const link = new URL(data.link)
    return (
        <div className="d-flex flex-row py-1" style={{ fontSize: 14 }}>
            <div className="d-flex align-items-center align-self-start">
                <span>{idx}.</span>
                {!voted && <img onClick={() => undefined} src={triangle} width={12} height={12} style={{ marginRight: 4 }} />}
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
                    <Link to={`/item?id=${data.id}`} className='link ms-1'>{data.comments.length} comments</Link>
                </div>
            </div>
        </div >
    )
}