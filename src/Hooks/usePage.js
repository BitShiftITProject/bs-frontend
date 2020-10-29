import { useQuery, queryCache } from 'react-query'
import { getPage } from '../Backend/Fetch'

export default function usePage(pageId) {
  return useQuery({
    queryKey: ['pages', pageId],
    queryFn: () => getPage(pageId),
    config: {
      // initialData: () => queryCache.getQueryData('pages')?.find((page) => page.id === pageId),
      // initialStale: true
    }
  })
}
