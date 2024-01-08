import { renderHook, fireEvent, waitFor } from '@testing-library/react'

import { useShrink } from "./useShrink"

test('should return shrink equals false for window.innerWidh < 992', async () => {
    const { result } = renderHook(() => useShrink())

    window.innerWidth = 300
    fireEvent(window, new Event('resize'))

    await waitFor(() => expect(result.current[0]).toBeFalsy())
})

test('should return shrink equals false for window.innerWidh = 992', async () => {
    const { result } = renderHook(() => useShrink())

    window.innerWidth = 992
    fireEvent(window, new Event('resize'))

    await waitFor(() => expect(result.current[0]).toBeFalsy())
})

test('should return shrink equals true for window.innerWidh > 992', async () => {
    const { result } = renderHook(() => useShrink())

    window.innerWidth = 1060
    fireEvent(window, new Event('resize'))

    await waitFor(() => expect(result.current[0]).toBeTruthy())
})