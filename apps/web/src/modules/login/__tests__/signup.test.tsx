import { MockPayloadGenerator, createMockEnvironment } from "relay-test-utils"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { RelayEnvironmentProvider } from "react-relay"
import { render, screen, act } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { ErrorPage } from "../../../error-page"
import { Signup } from "../signup"

const Mock = () => <div />
const routes = [
    { path: '/', element: <Mock />, errorElement: <ErrorPage /> },
    { path: '/login', element: <Signup />, errorElement: <ErrorPage /> },
]

test('should navigate to home after singup', async () => {
    const environment = createMockEnvironment()
    const router = createMemoryRouter(routes, {
        initialEntries: ['/', '/login'],
        initialIndex: 1
    })
    render(
        <RelayEnvironmentProvider environment={environment}>
            <RouterProvider router={router} />
        </RelayEnvironmentProvider>
    )
    const user = userEvent.setup()

    await user.click(screen.getByRole('button'))
    act(() =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        environment.mock.resolveMostRecentOperation((operation: any) =>
            MockPayloadGenerator.generate(operation)
        )
    )

    expect(router.state.location.pathname).toEqual('/')
})