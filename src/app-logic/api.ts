import { Octokit } from '@octokit/rest'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { GHRepoData } from './GHRepoData'

export type RequestState = 'none' | 'pending' | 'fulfilled' | 'rejected'

const octokit = new Octokit()

export interface Repo {
  owner: string
  repo: string
}

export const fetchIssuesAPI = async (
  params: GHRepoData & { currentPage: number; pageSize: number },
) => {
  const response = await octokit.issues.listForRepo({
    owner: params.owner,
    repo: params.repo,
    state: 'open',
    per_page: params.pageSize,
  })
  return response.data
}

export const fetchRepoDataAPI = async (repo: GHRepoData) => {
  const response = await octokit.repos.get({ ...repo })
  return response.data
}

export const fetchRepoData = createAsyncThunk(
  'gh-api/fetchRepoData',
  fetchRepoDataAPI,
)

export const fetchIssues = createAsyncThunk(
  'gh-api/fetchIssues',
  fetchIssuesAPI,
)
