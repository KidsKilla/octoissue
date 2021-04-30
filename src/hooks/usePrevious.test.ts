import { renderHook } from '@testing-library/react-hooks'
import { usePrevious } from './usePrevious'

it('inits with null', () => {
  const { result } = renderHook(() => usePrevious(1))
  expect(result.current).toBe(null)
})

it('returns prev value', () => {
  let val = 1
  const { result, rerender } = renderHook(() => usePrevious(val))
  expect(result.current).toBe(null)
  val = 2
  rerender()
  expect(result.current).toBe(1)
})

it('restores if no update', () => {
  let val = 1
  const { result, rerender } = renderHook(() => usePrevious(val))
  expect(result.current).toBe(null)
  val = 2
  rerender()
  expect(result.current).toBe(1)
  rerender()
  expect(result.current).toBe(2)
})
