import { graphql } from "relay-runtime"
import { useLazyLoadQuery } from "react-relay"

import { Header } from "../../components/header/header.js"
import { HomeRow } from "../../components/home-row/row.js"
import { useShrink } from "../../utils/useShrink.js"
import type { feedQuery as feedQueryType } from "./__generated__/feedQuery.graphql.js"

const feedQuery = graphql`
    query feedQuery {
        posts {
           ...rowFragment
        }
    }
`

export const Home = () => {
    const [shrink] = useShrink()
    const data = useLazyLoadQuery<feedQueryType>(feedQuery, {})

    return (
        <div className='mx-auto' style={{ width: shrink ? '85%' : '' }}>
            <Header />
            <div className="container-fluid px-1" style={{ backgroundColor: 'var(--spring-wood)' }}>
                {data.posts.map((elem, idx) =>
                    <HomeRow key={idx} post={elem} idx={idx + 1} />
                )}
            </div>
        </div>
    )
}