import { useQuery, useQueryCache } from 'react-query'
import { getPortfolio } from '../Backend/Fetch'

export default function usePortfolio(portfolioId) {
  const cache = useQueryCache()

  return useQuery({
    queryKey: ['portfolios', { id: portfolioId }],
    queryFn: () => {
      return getPortfolio(portfolioId)
    },
    config: {
      enabled: portfolioId,
      staleTime: 3 * 60 * 1000,
      initialData: () => cache.getQueryData(['portfolios', { id: portfolioId }])
    }
  })
}
