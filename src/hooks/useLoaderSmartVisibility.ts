import { useEffect, useState, useRef, useCallback } from 'react'
import { usePrevious } from './usePrevious'

export const useLoaderSmartVisibility = (
  isLoading: boolean,
  { minTimeout } = {
    minTimeout: 1000,
  },
) => {
  const now = Date.now()
  const [beginLoadingTime, setBeginLoadingTime] = useState(
    isLoading ? now : NaN,
  )
  const wasLoading = usePrevious(isLoading, false)
  const timeToWait = minTimeout + beginLoadingTime - now

  const tmr = useRef<ReturnType<typeof setTimeout> | null>(null)
  const stopTimer = useCallback(
    () => (tmr.current === null ? undefined : clearTimeout(tmr.current)),
    [],
  )
  const startTimer = useCallback((timeout) => {
    const now = Date.now()
    setBeginLoadingTime(now)
    tmr.current = setTimeout(() => {
      setBeginLoadingTime(NaN)
    }, timeout)
  }, [])

  useEffect(() => {
    if (isLoading && !wasLoading) {
      stopTimer()
      startTimer(minTimeout)
    }
  }, [isLoading, wasLoading, minTimeout, stopTimer, startTimer])

  useEffect(() => stopTimer, [stopTimer])

  return isLoading || timeToWait > 0
}
