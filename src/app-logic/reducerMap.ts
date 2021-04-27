import { issueSlice } from './store.issue'
import { repoSlice } from './store.repo'

export const ROOT_REDUCER = {
  repo: repoSlice.reducer,
  issue: issueSlice.reducer,
}

type ReducerMap = typeof ROOT_REDUCER
type RKeys = keyof ReducerMap

export type AppState = {
  [K in RKeys]: ReturnType<ReducerMap[K]>
}

export const rootSelect: {
  [K in RKeys]: (state: AppState) => AppState[K]
} = {
  issue: (state) => state.issue,
  repo: (state) => state.repo,
}

declare module 'react-redux' {
  interface DefaultRootState extends AppState {
    z?: never
  }
}
