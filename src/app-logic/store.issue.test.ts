import { DefaultRootState } from 'react-redux'
import { createStore } from './createStore'
import { fetchIssues } from './api'
import MOCK_RESPONSES from './mock/issues.mock.json'
import { issueAdapter } from './store.issue'
import { rootSelect } from './reducerMap'

const testStore = createStore()
const createArgs = (currentPage = 1) => ({
  currentPage,
  owner: 'test.ownr',
  repo: 'test.repo',
})

const sel = issueAdapter.getSelectors(
  (state: DefaultRootState) => rootSelect.issue(state).data,
)

describe('issueSlice', () => {
  it('Updates', () => {
    testStore.dispatch(
      // @ts-expect-error null vs undefined
      fetchIssues.fulfilled(MOCK_RESPONSES[0].response, '1', createArgs()),
    )
    expect(sel.selectAll(testStore.getState())).toStrictEqual(
      MOCK_RESPONSES[0].response,
    )

    testStore.dispatch(
      // @ts-expect-error null vs undefined
      fetchIssues.fulfilled(MOCK_RESPONSES[1].response, '2', createArgs(2)),
    )
    expect(sel.selectAll(testStore.getState())).toStrictEqual(
      MOCK_RESPONSES[1].response,
    )
  })
})
