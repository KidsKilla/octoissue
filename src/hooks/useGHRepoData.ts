import { useDispatch, useSelector } from 'react-redux'
import { rootSelect } from '../app-logic/reducerMap'
import { fetchRepoData } from '../app-logic/api'

export const useGHRepoData = () => {
  const dispatch = useDispatch()
  const { params, data, request } = useSelector(rootSelect.repo)
  return {
    owner: params.owner,
    repo: params.repo,
    data,
    request,
    updateRepoData: async (owner: string, repo: string) => {
      dispatch(
        fetchRepoData({
          owner,
          repo,
        }),
      )
    },
  }
}
