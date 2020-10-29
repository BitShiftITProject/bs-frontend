import { useQuery } from 'react-query'
import { getPortfolio, queryCache } from '../Backend/Fetch'

export default function usePortfolio(portfolioId) {
  return useQuery({
    queryKey: ['portfolios', portfolioId],
    queryFn: () => getPortfolio(portfolioId),
    config: {
      // initialData: () =>
      //   queryCache.getQueryData('portfolios')?.find((portfolio) => portfolio.id === portfolioId),
      // initialStale: true
    }
  })
}
