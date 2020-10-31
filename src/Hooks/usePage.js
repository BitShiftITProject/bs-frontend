import { useQuery, useQueryCache } from 'react-query'
import { getPage } from '../Backend/Fetch'
import { useStore } from './Store'

const portfolioIdSelector = (state) => state.portfolioId

export default function usePage(pageId) {
  const portfolioId = useStore(portfolioIdSelector)

  const cache = useQueryCache()

  return useQuery({
    queryKey: ['pages', { portfolioId, pageId }],
    queryFn: () => {
      if (pageId) {
        return getPage(pageId)
      }
    },
    config: {
      enabled: pageId,
      staleTime: 3 * 60 * 1000,
      initialData: () => cache.getQueryData(['pages', { portfolioId, pageId }])
    }
  })
}
