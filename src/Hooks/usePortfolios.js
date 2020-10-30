import { useQuery, queryCache } from 'react-query'
import { getUserPortfolios } from '../Backend/Fetch'

export default function usePortfolios(user) {
  return useQuery({
    queryKey: 'portfolios',
    queryFn: () => getUserPortfolios(user.username),
    config: {
      enabled: user,
      staleTime: 3 * 60 * 1000,
      onSuccess: (data) =>
        data.forEach((portfolio) => {
          queryCache.setQueryData(['portfolios', portfolio.id], portfolio)
        })
    }
  })
}
