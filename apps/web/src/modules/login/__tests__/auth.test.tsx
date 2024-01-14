import { render, screen, act } from "@testing-library/react"
import { RelayEnvironmentProvider } from "react-relay"
import { MockPayloadGenerator, createMockEnvironment } from "relay-test-utils"
import { RouterProvider, createMemoryRouter } from "react-router-dom"

import { ErrorPage } from "../../../error-page"
import { Auth } from "../auth"
import userEvent from "@testing-library/user-event"
import { Token } from "../token"

const Mock = () => <div />
const routes = [
    { path: '/', element: <Mock />, errorElement: <ErrorPage /> },
    { path: '/login', element: <Auth />, errorElement: <ErrorPage /> },
    { path: '/token', element: <Token />, errorElement: <ErrorPage /> },
]

test('should navigate to token after login', async () => {
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

    await user.click(screen.getByTestId('login'))
    act(() =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        environment.mock.resolveMostRecentOperation((operation: any) =>
            MockPayloadGenerator.generate(operation)
        )
    )

    expect(router.state.location.pathname).toEqual('/token')
})

test('should navigate to home after token authentication', async () => {
    const environment = createMockEnvironment()
    const router = createMemoryRouter(routes, {
        initialEntries: ['/', '/token'],
        initialIndex: 1
    })
    render(
        <RelayEnvironmentProvider environment={environment}>
            <RouterProvider router={router} />
        </RelayEnvironmentProvider>
    )
    const user = userEvent.setup()

    await user.click(screen.getByTestId('authenticate'))
    act(() =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        environment.mock.resolveMostRecentOperation((operation: any) =>
            MockPayloadGenerator.generate(operation)
        )
    )

    expect(router.state.location.pathname).toEqual('/')
})
