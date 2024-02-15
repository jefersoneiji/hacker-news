import { test } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, act, screen } from "@testing-library/react"
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { RelayEnvironmentProvider } from "react-relay"

import { Post } from "../post"
import { ErrorPage } from "../../../error-page"

beforeAll(() => {
    localStorage.setItem('hn-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWEwNTUyZTcyMjVmMTkzNDBmNTUzOTciLCJpYXQiOjE3MDc5NTI4ODN9.7SQRJp35DhvAI3nZOQF2ZynX7ontyVQAdvC04GAxECo')
})

const Mock = () => <div />
const routes = [
    { path: '/', element: <Mock />, errorElement: <ErrorPage /> },
    { path: '/submit', element: <Post />, errorElement: <ErrorPage /> },
]

test('should navigate to home pagefter a submit is done by use', async () => {
    const environment = createMockEnvironment()
    const router = createMemoryRouter(routes, {
        initialEntries: ['/', '/submit'],
        initialIndex: 1
    })
    render(
        <RelayEnvironmentProvider environment={environment}>
            <RouterProvider router={router} />
        </RelayEnvironmentProvider>,
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