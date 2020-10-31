import { useQueryCache, useMutation } from 'react-query'
import { postPortfolioToUser } from '../Backend/Fetch'

export default function useAddPortfolio() {
  const cache = useQueryCache()

  return useMutation(({ username, postDetails }) => postPortfolioToUser(username, postDetails), {
    onSuccess: () => cache.invalidateQueries('portfolios')
  })
}
