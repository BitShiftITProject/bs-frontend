import { queryCache, useMutation } from 'react-query'
import { postPortfolioToUser } from '../Backend/Fetch'

export default function useAddPortfolio() {
  return useMutation(({ username, postDetails }) => postPortfolioToUser(username, postDetails), {
    onSuccess: () => queryCache.invalidateQueries('portfolios')
  })
}
