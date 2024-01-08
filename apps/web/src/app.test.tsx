import { test } from 'vitest'
import { render, act, screen, waitFor } from '@testing-library/react'
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils'
import { RelayEnvironmentProvider } from 'react-relay'

import App from './App'

test('should find edit in screen', async () => {
    const environment = createMockEnvironment()
    render(
        <RelayEnvironmentProvider environment={environment}>
            <App />
        </RelayEnvironmentProvider>
    )

    act(() =>
        environment.mock.resolveMostRecentOperation((operation: any) =>
            MockPayloadGenerator.generate(operation
            ))
    )

    await waitFor(() => expect(screen.getByText(/data.id/i)).toBeInTheDocument())
})
