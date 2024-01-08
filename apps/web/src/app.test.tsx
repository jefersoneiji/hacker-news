import { test } from 'vitest'
import { render, act, screen, waitFor } from '@testing-library/react'
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils'
import { RelayEnvironmentProvider } from 'react-relay'

import App from './App'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import { userEvent } from '@testing-library/user-event'
import { router } from './router'

test('should find edit in screen', async () => {
    const environment = createMockEnvironment()
    render(
        <RelayEnvironmentProvider environment={environment}>
            <App />
        </RelayEnvironmentProvider>,
        { wrapper: BrowserRouter }
    )

    act(() =>
        environment.mock.resolveMostRecentOperation((operation: any) =>
            MockPayloadGenerator.generate(operation
            ))
    )

    await waitFor(() => expect(screen.getByText(/data.id/i)).toBeInTheDocument())
})

test('should return new screen after user click', async () => {
    const environment = createMockEnvironment()
    render(
        <RelayEnvironmentProvider environment={environment}>
            <RouterProvider router={router} />
        </RelayEnvironmentProvider>
    )
    const user = userEvent.setup()
    act(() =>
        environment.mock.resolveMostRecentOperation((operation: any) =>
            MockPayloadGenerator.generate(operation
            ))
    )

    await waitFor(() => expect(screen.getByText(/data.id/i)).toBeInTheDocument())
    await user.click(screen.getByText(/Go to About/))

    await waitFor(() => expect(screen.getByText(/Hello from About Page!/i)).toBeInTheDocument())
})
