import { graphql } from "relay-runtime"
import { useLazyLoadQuery, useMutation } from "react-relay"
import { useEffect, useState } from "react"

import { Header } from "../../components/header/header"
import { useShrink } from "../../utils/useShrink"
import type { postPageQuery as postPageQueryType } from "./__generated__/postPageQuery.graphql"
import { PostDisplay } from "./display"
import { Comment } from "./comment"
import { useNavigate, useSearchParams } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import { jwtVerify } from "jose"
import { toGlobalId } from "graphql-relay"

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

type TComment = {
    comment: string
}
export const PostPage = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm<TComment>()
    const [shrink] = useShrink()

    const [userId, setUserId] = useState('')
    useEffect(() => {
        const token = localStorage.getItem('hn-token')!
        jwtVerify(token, new TextEncoder().encode(import.meta.env.VITE_APP_SECRET)).then(res => setUserId(toGlobalId('post', res.payload.userId as string)))
    }, [])

    const [searchParams] = useSearchParams()
    const postId = searchParams.get('id')!
    const data = useLazyLoadQuery<postPageQueryType>(postPageQuery, { postID: postId })

    const [commitMutation] = useMutation(postPageMutation)

    const navigate = useNavigate()
    const onSubmit: SubmitHandler<TComment> = (e: TComment) => {

        commitMutation({
            variables: {
                postId,
                comment: e.comment,
                userId
            },
            onCompleted() {
                reset()
                navigate(0)
            }
        })
    }
    return (
        <div className="mx-auto" style={{ width: shrink ? '85%' : '' }}>
            <Header />
            <div className="container-fluid px-2 pt-2" style={{ backgroundColor: 'var(--spring-wood)' }}>
                <PostDisplay post={data.findPost} />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <textarea
                        rows={8}
                        cols={80}
                        {...register('comment', { required: true, minLength: 20 })}
                        wrap="virtual"
                        className="mt-3"
                    />
                    {errors.comment?.type === 'required' && <p className='text-danger' role='alert'>comment is required</p>}
                    {errors.comment?.type === 'minLength' && <p className='text-danger' role='alert'>minimun lenght for comment is 20 characters</p>}

                    <div className="mt-3 pb-3">
                        <input type='submit' value='add comment' />
                    </div>
                </form>
                <Comment post={data.findPost} />
            </div>
        </div>
    )
}