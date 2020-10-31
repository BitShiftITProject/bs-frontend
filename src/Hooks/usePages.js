import { useQuery, useQueryCache } from 'react-query'
import { getPortfolioPages } from '../Backend/Fetch'

export default function usePages(portfolioId) {
  const cache = useQueryCache()

  return useQuery({
    queryKey: ['pages', { portfolioId }],
    queryFn: () => getPortfolioPages(portfolioId),
    config: {
      enabled: ['portfolios', portfolioId],
      staleTime: 3 * 60 * 1000,
      onSuccess: (data) =>
        data.forEach((page) => {
          if (page) cache.setQueryData(['pages', { portfolioId, pageId: page.id }], page)
        })
    }
  })
}
