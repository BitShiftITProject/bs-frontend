import { useQuery, queryCache } from 'react-query'
import { getUserPortfolios } from '../Backend/Fetch'

export default function usePortfolios(user) {
  return useQuery({
    queryKey: 'portfolios',
    queryFn: () => getUserPortfolios(user.username),
    config: {
      enabled: user,
      onSuccess: (data) =>
        data.forEach((portfolio) => {
          queryCache.setQueryData(['portfolios', portfolio.id], portfolio)
        })
    }
  })
}
