import { useQueryCache, useMutation } from 'react-query'
import { deletePortfolio } from '../Backend/Fetch'

export default function useDeletePortfolio() {
  const cache = useQueryCache()

  return useMutation(({ portfolioId }) => deletePortfolio(portfolioId), {
    onSuccess: (_, variables) => {
      cache.invalidateQueries(['portfolios'])
      cache.removeQueries(['portfolios', { id: variables.portfolioId }], { exact: true })
      cache.removeQueries(['pages', { portfolioId: variables.portfolioId }])
    }
  })
}
