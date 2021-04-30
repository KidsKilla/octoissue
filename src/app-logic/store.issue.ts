import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { fetchIssues, fetchRepoData, RequestState } from './api'
import { createErrorByActionError } from '../lib/createErrorByActionError'

export type GHIssue = Pick<
  RestEndpointMethodTypes['issues']['listForRepo']['response']['data'][0],
  'title' | 'body' | 'number'
>

export const issueAdapter = createEntityAdapter<GHIssue>({
  selectId: (itm) => itm.number,
})

const INITIAL_STATE = {
  request: {
    id: null as null | string,
    status: 'none' as RequestState,
    error: null as null | Error,
  },
  data: issueAdapter.getInitialState(),
}

export const issueSlice = createSlice({
  name: 'gh-issue',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchRepoData.pending, () => INITIAL_STATE)
      .addCase(fetchIssues.pending, (state, action) => {
        state.request.status = action.meta.requestStatus
        state.request.id = action.meta.requestId
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.request.status = action.meta.requestStatus
        state.request.error = null
        state.data = issueAdapter.removeAll(state.data)
        state.data = issueAdapter.addMany(state.data, action)
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.request.status = action.meta.requestStatus
        state.request.error = createErrorByActionError(action.error)
        state.data = issueAdapter.removeAll(state.data)
      }),
})
