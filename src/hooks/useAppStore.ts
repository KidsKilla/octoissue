import { useMemo } from 'react'
import { createStore } from '../app-logic/createStore'
import { uiSlice } from './useCurrentPage'

declare module 'react-redux' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultRootState {
    ui: ReturnType<typeof uiSlice.reducer>
  }
}

export const useAppStore = () =>
  useMemo(
    () =>
      createStore({
        ui: uiSlice.reducer,
      }),
    [],
  )
