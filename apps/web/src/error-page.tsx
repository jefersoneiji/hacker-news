import { useRouteError } from 'react-router-dom'

type TError = {
    statusText: string
    message: string
}
export const ErrorPage = () => {
    const error = useRouteError() as TError
    console.error(error)

    return (
        <div>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    )
}