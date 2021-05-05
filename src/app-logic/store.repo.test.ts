import { createStore } from './createStore'
import { fetchRepoData } from './api'
import MOCK_RESPONSES from './mock/repo.mock.json'
import { rootSelect, AppState } from './reducerMap'

const testStore = createStore()
const { dispatch, getState } = testStore

const createArgs = () => ({
  owner: 'test.ownr',
  repo: 'test.repo',
})

const select = (state: AppState) => rootSelect.repo(state)

const GH_REPOS = MOCK_RESPONSES.map((it) => it.response)

it('Updates are saved', () => {
  dispatch(fetchRepoData.fulfilled(GH_REPOS[0], 'id1', createArgs()))
  expect(select(getState()).data).toStrictEqual(GH_REPOS[0])
})

it('Request OK', () => {
  dispatch(fetchRepoData.pending('id1', createArgs()))
  const pending = select(getState())

  expect(pending.params).toStrictEqual(createArgs())
  expect(pending.request).toStrictEqual({
    status: 'pending',
    error: null,
    id: 'id1',
  })

  dispatch(fetchRepoData.fulfilled(GH_REPOS[0], 'id1', createArgs()))
  const fulfilled = select(getState())

  expect(fulfilled.params).toStrictEqual(createArgs())
  expect(fulfilled.request).toStrictEqual({
    status: 'fulfilled',
    error: null,
    id: 'id1',
  })
})

it('Request FAILED', () => {
  dispatch(fetchRepoData.pending('id1', createArgs()))
  const pending = select(getState())

  expect(pending.params).toStrictEqual(createArgs())
  expect(pending.request).toStrictEqual({
    status: 'pending',
    error: null,
    id: 'id1',
  })

  const err = new ReferenceError('test')
  dispatch(fetchRepoData.rejected(err, 'id1', createArgs()))
  const rejected = select(getState())

  expect(rejected.params).toStrictEqual(createArgs())
  expect(rejected.request).toStrictEqual({
    status: 'rejected',
    error: {
      name: 'ReferenceError',
      message: 'test',
      stack: expect.any(String),
    },
    id: 'id1',
  })
})

it('Request FAILED with code', () => {
  dispatch(fetchRepoData.pending('id1', createArgs()))
  const pending = select(getState())

  expect(pending.params).toStrictEqual(createArgs())
  expect(pending.request).toStrictEqual({
    status: 'pending',
    error: null,
    id: 'id1',
  })

  const err = new Error('test2')
  // @ts-expect-error Error have no code prop
  err.code = 'TEST_CODE'
  dispatch(fetchRepoData.rejected(err, 'id1', createArgs()))
  const rejected = select(getState())

  expect(rejected.params).toStrictEqual(createArgs())
  expect(rejected.request).toStrictEqual({
    status: 'rejected',
    error: {
      name: 'Error',
      message: 'test2',
      stack: expect.any(String),
      code: 'TEST_CODE',
    },
    id: 'id1',
  })
})
