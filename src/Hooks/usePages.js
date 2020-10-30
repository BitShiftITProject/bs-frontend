import { useQuery, queryCache } from 'react-query'
import { getPortfolioPages } from '../Backend/Fetch'

export default function usePages(portfolioId) {
  return useQuery({
    queryKey: 'pages',
    queryFn: () => getPortfolioPages(portfolioId),
    config: {
      enabled: ['portfolios', portfolioId],
      staleTime: 3 * 60 * 1000,
      onSuccess: (data) =>
        data.forEach((page) => {
          queryCache.setQueryData(['pages', page.id], page)
        })
    }
  })
}
