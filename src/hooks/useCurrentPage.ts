import { useCallback } from 'react'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { fetchIssues } from '../app-logic/api'

export const uiSlice = createSlice({
  name: 'ui-state',
  initialState: {
    currentPage: 1,
    isCached: false,
  },
  reducers: {
    changePage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
      state.isCached = false
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchIssues.fulfilled, (state) => {
        state.isCached = true
      })
      .addCase(fetchIssues.pending, (state) => {
        state.isCached = true
      })
      .addCase(fetchIssues.rejected, (state) => {
        state.isCached = false
      }),
})

export const useCurrentPage = () => {
  const dipatch = useDispatch()
  return {
    ...useSelector((state) => state.ui),
    setCurrentPage: useCallback(
      (page: number) => dipatch(uiSlice.actions.changePage(page)),
      [dipatch],
    ),
  }
}
