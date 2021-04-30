import { renderHook, act } from '@testing-library/react-hooks'
import { useLoaderSmartVisibility } from './useLoaderSmartVisibility'

const TIMEOUT = 888
const LESS_THAN_TIMEOUT = 100
const MORE_THAN_TIMEOUT = TIMEOUT + LESS_THAN_TIMEOUT

const origNow = Date.now
const baseTime = Date.now()
let nowTime = baseTime

beforeEach(() => {
  jest.useFakeTimers()
  nowTime = baseTime
  Date.now = () => nowTime
})

afterEach(() => {
  jest.useRealTimers()
  Date.now = origNow
})

const waitSomeTime = (time: number) =>
  act(() => {
    nowTime += time
    jest.advanceTimersByTime(time)
  })

const createRender = ({ isLoading }: { isLoading: boolean }) =>
  renderHook(
    ({ isLoading }) =>
      useLoaderSmartVisibility(isLoading, {
        minTimeout: TIMEOUT,
      }),
    { initialProps: { isLoading } },
  )

it.each([true, false])('returns initial value: %j', (isLoading) => {
  const { result } = createRender({ isLoading })
  expect(result.current).toBe(isLoading)
})

it('uses minimalTimeout param', async () => {
  jest.spyOn(global, 'setTimeout')

  const { result, rerender } = createRender({ isLoading: true })
  waitSomeTime(TIMEOUT - 1)
  rerender({ isLoading: false })
  expect(result.current).toBe(true)

  waitSomeTime(1)
  rerender({ isLoading: false })
  expect(result.current).toBe(false)

  jest.spyOn(global, 'setTimeout').mockRestore()
})

it('shown loader immediately (isLoading: false => true)', async () => {
  const { result, rerender } = createRender({ isLoading: false })
  expect(result.current).toBe(false)

  waitSomeTime(LESS_THAN_TIMEOUT)
  expect(result.current).toBe(false)

  rerender({ isLoading: true })
  expect(result.current).toBe(true)
})

test('one FAST request: delays hiding loader', async () => {
  const { result, rerender } = createRender({ isLoading: true })
  expect(result.current).toBe(true)

  waitSomeTime(LESS_THAN_TIMEOUT)
  rerender({ isLoading: false })
  // Too fast, loader still visible
  expect(result.current).toBe(true)

  waitSomeTime(TIMEOUT)
  rerender({ isLoading: false })
  expect(result.current).toBe(false)
})

test('one LONG request: hides when loading stopped', async () => {
  const { result, rerender } = createRender({ isLoading: true })
  expect(result.current).toBe(true)

  waitSomeTime(MORE_THAN_TIMEOUT)
  // Min time passed, but still loading
  expect(result.current).toBe(true)

  rerender({ isLoading: false })
  expect(result.current).toBe(false)
})

it('debounces many fast updates', async () => {
  const { result, rerender } = createRender({ isLoading: true })
  expect(result.current).toBe(true)
  ;[true, true, true, true, false].forEach((it) => {
    waitSomeTime(TIMEOUT / 2)
    rerender({ isLoading: it })
    expect(result.current).toBe(it)
  })
})
