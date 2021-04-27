import { DefaultRootState, useSelector } from 'react-redux'
import { issueAdapter } from '../app-logic/store.issue'
import { rootSelect } from '../app-logic/reducerMap'

const selIssue = issueAdapter.getSelectors(
  (state: DefaultRootState) => rootSelect.issue(state).data,
)

export const useOneGHIssue = (issueId: string) => {
  return {
    issue: useSelector((state) => selIssue.selectById(state, issueId)),
  }
}
