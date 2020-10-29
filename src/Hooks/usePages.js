import { useQuery, queryCache } from 'react-query'
import { getPortfolioPages } from '../Backend/Fetch'

export default function usePages(portfolioId) {
  return useQuery({
    queryKey: 'pages',
    queryFn: () => getPortfolioPages(portfolioId),
    config: {
      onSuccess: (data) =>
        data.forEach((page) => {
          queryCache.setQueryData(['pages', page.id], page)
        })
    }
  })
}
