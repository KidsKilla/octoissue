import { useMemo } from 'react'
import { useHistory } from 'react-router'
import { fetchRepoData } from '../app-logic/api'
import { createStore } from '../app-logic/createStore'
import { AppNavParams } from '../features/AppNavParams'

export const useAppStore = () => {
  const history = useHistory<AppNavParams>()
  const store = useMemo(
    () =>
      createStore({
        ui: (_state, action) => {
          if (fetchRepoData.fulfilled.match(action)) {
            Promise.resolve().then(() => {
              history.push('/issues')
            })
          }
          return null
        },
      }),
    [history],
  )
  return store
}
