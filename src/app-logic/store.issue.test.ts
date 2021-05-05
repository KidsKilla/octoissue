import { createStore } from './createStore'
import { fetchIssues, fetchRepoData } from './api'
import MOCK_RESPONSES from './mock/issues.mock.json'
import { issueAdapter } from './store.issue'
import { rootSelect, AppState } from './reducerMap'

const testStore = createStore()
const { dispatch, getState } = testStore
const createArgs = (currentPage = 1) => ({
  currentPage,
  owner: 'test.ownr',
  repo: 'test.repo',
  pageSize: 3,
})

const { selectAll } = issueAdapter.getSelectors(
  (state: AppState) => rootSelect.issue(state).data,
)

const GH_ISSUES = MOCK_RESPONSES.map((it) => it.response)

describe('issueSlice', () => {
  it('Updates', () => {
    // @ts-expect-error null vs undefined
    dispatch(fetchIssues.fulfilled(GH_ISSUES[0], 'id1', createArgs()))
    expect(selectAll(getState())).toStrictEqual(GH_ISSUES[0])

    // @ts-expect-error null vs undefined
    dispatch(fetchIssues.fulfilled(GH_ISSUES[1], 'id2', createArgs(2)))
    expect(selectAll(getState())).toStrictEqual(GH_ISSUES[1])
  })

  it('Resets on data update', () => {
    // @ts-expect-error null vs undefined
    dispatch(fetchIssues.fulfilled(GH_ISSUES[0], 'i1', createArgs()))
    expect(selectAll(getState())).toStrictEqual(GH_ISSUES[0])

    dispatch(fetchRepoData.pending('rd1', createArgs()))
    expect(selectAll(getState())).toStrictEqual([])
  })
})
