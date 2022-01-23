import React from 'react'

/**
 * This hook allows you to debounce any fast changing value
 * @param value value to debounce
 * @param delay time in milliseconds
 * @returns debounced value
 */
export function useDebounce<T>(value: T, delay = 0) {
  const [debouncedValue, setDebouncedValue] = React.useState(value)

  React.useEffect(() => {
    // Update the inner state after wait <delay> ms
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Clear timeout in case a new value is received
    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [value, delay])

  return debouncedValue
}
