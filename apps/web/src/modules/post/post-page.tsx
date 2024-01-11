import { graphql } from "relay-runtime"
import { useLazyLoadQuery, useMutation } from "react-relay"
import { FormEvent, useState } from "react"

import { Header } from "../../components/header/header"
import { useShrink } from "../../utils/useShrink"
import type { postPageQuery as postPageQueryType } from "./__generated__/postPageQuery.graphql"
import { PostDisplay } from "./display"
import { Comment } from "./comment"

const postPageQuery = graphql`
    query postPageQuery($postID: ID!){
        findPost(postID: $postID){
            ...displayFragment
            ...commentFragment
        }
    }
`
const postPageMutation = graphql`
    mutation postPageMutation($postId: ID!, $comment: String!, $userId: ID!){
        comment(postId: $postId, comment: $comment, userId: $userId){
            comment
        }
    }
`

export const PostPage = () => {
    const [shrink] = useShrink()

    const args = {
        postID: "cG9zdDozNTljNzJhNGY4MDM0ZDdiNmU1YThkMWM=",
        userId: "dXNlcjo2NTlmMWY3MTVmOGFkMThkZTI5YWM1NGE="
    }

    const data = useLazyLoadQuery<postPageQueryType>(postPageQuery, args)
    const [commitMutation] = useMutation(postPageMutation)
    const [comment, setComment] = useState('')

    const onSubmit = (e: FormEvent<HTMLElement>) => {
        e.preventDefault()

        commitMutation({
            variables: {
                postId: args.postID,
                comment,
                userId: args.userId
            },
            onCompleted() {
                setComment('')
            }
        })
    }
    return (
        <div className="mx-auto" style={{ width: shrink ? '85%' : '' }}>
            <Header />
            <div className="container-fluid px-2 pt-2" style={{ backgroundColor: 'var(--spring-wood)' }}>
                <PostDisplay post={data.findPost} />
                <form onSubmit={onSubmit}>
                    <textarea
                        rows={8}
                        cols={80}
                        wrap="virtual"
                        className="mt-3"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />
                    <div className="mt-3 pb-3">
                        <input type='submit' value='add comment' />
                    </div>
                </form>
                <Comment post={data.findPost} />
            </div>
        </div>
    )
}