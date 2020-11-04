import { useQuery, useQueryCache } from 'react-query'
import { useLocation } from 'react-router-dom'
import { getPortfolioPages } from '../Backend/Fetch'

export default function usePages(portfolioId) {
  const cache = useQueryCache()
  const { pathname } = useLocation()

  return useQuery({
    queryKey: ['pages', { portfolioId }],
    queryFn: () => getPortfolioPages(portfolioId),
    config: {
      enabled: ['portfolios', portfolioId],
      staleTime: 3 * 60 * 1000,
      onSuccess: (data) =>
        data.forEach((page) => {
          if (page) cache.setQueryData(['pages', { portfolioId, pageId: page.id }], page)
        }),
      refetchOnWindowFocus: pathname.includes('public') ? 'always' : true
    }
  })
}
