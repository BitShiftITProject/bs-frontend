import { queryCache, useMutation } from 'react-query'
import { patchPortfolio } from '../Backend/Fetch'

export default function useEditPortfolio() {
  return useMutation(({ portfolioId, patchDetails }) => patchPortfolio(portfolioId, patchDetails), {
    onSuccess: (data, variables) =>
      queryCache.invalidateQueries(['portfolios', variables.portfolioId])
  })
}
