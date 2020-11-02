import { useQuery, useQueryCache } from 'react-query'
import { getUserPortfolios } from '../Backend/Fetch'

export default function usePortfolios(user) {
  const cache = useQueryCache()

  return useQuery({
    queryKey: ['portfolios'],
    queryFn: () => getUserPortfolios(user.username),
    config: {
      enabled: user,
      staleTime: 3 * 60 * 1000,
      onSuccess: (data) =>
        data.forEach((portfolio) => {
          cache.setQueryData(['portfolios', { id: portfolio.id }], portfolio)
        })
    }
  })
}
