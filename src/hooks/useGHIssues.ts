import { useMemo } from 'react'
import { DefaultRootState, useDispatch, useSelector } from 'react-redux'
import { fetchIssues } from '../app-logic/api'
import { issueAdapter } from '../app-logic/store.issue'
import { rootSelect } from '../app-logic/reducerMap'

const selIssue = issueAdapter.getSelectors(
  (state: DefaultRootState) => rootSelect.issue(state).data,
)

export const useGHIssues = () => {
  const dispatch = useDispatch()
  const request = useSelector((state) => rootSelect.issue(state).request)
  return {
    request,
    allIssues: useSelector(selIssue.selectAll),
    fetchIssues: useMemo(
      () => async (params: {
        owner: string
        repo: string
        currentPage: number
        pageSize: number
      }) => {
        if (!params.owner || !params.repo) {
          throw new Error('Repo data missing')
        }
        dispatch(fetchIssues(params))
      },
      [dispatch],
    ),
  }
}
