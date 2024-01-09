import { graphql } from 'relay-runtime'
import { Link } from 'react-router-dom'
import { useFragment } from 'react-relay'

import triangle from './triangle.svg'
import './home-row.css'
import { rowFragment$key } from './__generated__/rowFragment.graphql'

const homeRowFragment = graphql`
    fragment rowFragment on post {
        title
        id
    }
`
export const HomeRow = ({ post, idx }: { post: rowFragment$key, idx: number }) => {
    const data = useFragment(homeRowFragment, post)

    const voted: boolean = false
    return (
        <div className="d-flex flex-row py-1" style={{ fontSize: 14 }}>
            <div className="d-flex align-items-center align-self-start">
                <span>{idx}.</span>
                {!voted && <img onClick={() => undefined} src={triangle} width={12} height={12} style={{ marginRight: 4 }} />}
                {voted && <span style={{ marginRight: 16 }} />}
            </div>
            <div className="d-flex flex-column">
                <div className='d-flex flex-row align-items-end'>
                    <Link to='/' className='text-dark text-decoration-none'>
                        {data.title}
                    </Link>
                    <a href='/' className='link ms-2' style={{ fontSize: 13 }}>(blog.haschek.at)</a>
                </div>
                <div className='d-flex flex-row' style={{ fontSize: 12, color: 'var(--gray)' }}>
                    <span>50 points by <Link to='/' className='link'>jefersoneiji</Link></span>
                    <Link to='/' className='link ms-1'>2 hours ago</Link>
                    <Link to='/' className='link ms-1'>| hide |</Link>
                    <Link to='/' className='link ms-1'>54 comments</Link>
                </div>
            </div>
        </div >
    )
}