import { graphql } from "relay-runtime"
import { useLazyLoadQuery } from "react-relay"
import { FormEvent } from "react"

import { Header } from "../../components/header/header"
import { useShrink } from "../../utils/useShrink"
import type { postPageQuery as postPageQueryType } from "./__generated__/postPageQuery.graphql"
import { PostDisplay } from "./display"

const postPageQuery = graphql`
    query postPageQuery($postID: ID!){
        findPost(postID: $postID){
            ...displayFragment
        }
    }
`

export const PostPage = () => {
    const [shrink] = useShrink()

    const data = useLazyLoadQuery<postPageQueryType>(postPageQuery, { postID: "359c72a4f8034d7b6e5a8d1c" })

    const onSubmit = (e: FormEvent<HTMLElement>) => {
        e.preventDefault()
    }
    return (
        <div className="mx-auto" style={{ width: shrink ? '85%' : '' }}>
            <Header />
            <div className="container-fluid px-2 pt-2" style={{ backgroundColor: 'var(--spring-wood)' }}>
                <PostDisplay post={data.findPost}/>
                <form onSubmit={onSubmit}>
                    <textarea rows={8} cols={80} wrap="virtual" className="mt-3" />
                    <div className="mt-3">
                        <input type='submit' value='add comment' />
                    </div>
                </form>
            </div>
        </div>
    )
}