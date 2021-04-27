import { createSlice } from '@reduxjs/toolkit'
import { GHRepoData } from './GHRepoData'
import { fetchRepoData, RequestState } from './api'
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods'
import { createErrorByActionError } from '../lib/createErrorByActionError'

export type GHRepoAPIData = RestEndpointMethodTypes['repos']['get']['response']['data']

export type GHRepoState =
  | GHRepoData
  | {
      owner: null
      repo: null
    }

const INITIAL_STATE = {
  params: {
    owner: null,
    repo: null,
  } as GHRepoState,
  request: {
    status: 'none' as RequestState,
    error: null as null | Error,
    id: null as null | string,
  },
  data: null as null | GHRepoAPIData,
}

export const repoSlice = createSlice({
  name: 'gh-repo-data',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchRepoData.pending, (state, action) => {
        state.request.status = action.meta.requestStatus
        state.request.id = action.meta.requestId
        state.params = action.meta.arg
      })
      .addCase(fetchRepoData.fulfilled, (state, action) => {
        state.request.status = action.meta.requestStatus
        state.data = action.payload
      })
      .addCase(fetchRepoData.rejected, (state, action) => {
        state.request.status = action.meta.requestStatus
        state.request.error = createErrorByActionError(action.error)
      }),
})
