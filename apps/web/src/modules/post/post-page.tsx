import { graphql } from "relay-runtime"
import { Header } from "../../components/header/header"
import { useShrink } from "../../utils/useShrink"
import { useLazyLoadQuery } from "react-relay"
import type { postPageQuery as postPageQueryType } from "./__generated__/postPageQuery.graphql"
import { PostDisplay } from "./display"

const postPageQuery = graphql`
    query postPageQuery($postID: ID!){
        findPost(postID: $postID){
            ...rowFragment
        }
    }
`

export const PostPage = () => {
    const [shrink] = useShrink()

    const data = useLazyLoadQuery<postPageQueryType>(postPageQuery, { postID: "359c72a4f8034d7b6e5a8d1c" })

    return (
        <div className="mx-auto" style={{ width: shrink ? '85%' : '' }}>
            <Header />
            <div className="container-fluid px-1" style={{ backgroundColor: 'var(--spring-wood)' }}>
                <PostDisplay/>
            </div>
        </div>
    )
}