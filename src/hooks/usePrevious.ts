import { useEffect, useRef } from 'react'

export const usePrevious = <T>(value: T, defaultVal: T | null = null) => {
  const ref = useRef<T | null>(defaultVal)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
