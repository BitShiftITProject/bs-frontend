import { queryCache, useMutation } from 'react-query'
import { deletePortfolio } from '../Backend/Fetch'

export default function useDeletePortfolio() {
  return useMutation(({ portfolioId }) => deletePortfolio(portfolioId), {
    onSuccess: (data, variables) => queryCache.invalidateQueries('portfolios')
  })
}
