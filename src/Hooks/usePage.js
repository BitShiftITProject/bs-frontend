import { useQuery, queryCache } from 'react-query'
import { getPage } from '../Backend/Fetch'

export default function usePage(pageId) {
  return useQuery({
    queryKey: ['pages', pageId],
    queryFn: () => getPage(pageId),
    config: {
      enabled: pageId,
      staleTime: 3 * 60 * 1000,
      initialData: () => queryCache.getQueryData('pages')?.find((page) => page.id === pageId)
      // initialStale: true
    }
  })
}
