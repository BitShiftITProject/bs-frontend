import { useQuery, useQueryCache } from 'react-query'
import { getMediaItem } from '../Backend/Fetch'

export default function useMediaItem(key) {
  const cache = useQueryCache()

  return useQuery({
    queryKey: [key, { type: 'mediaItem' }],
    queryFn: () => {
      return getMediaItem(key)
    },
    config: {
      enabled: key,
      staleTime: 3 * 60 * 1000,
      initialData: () => cache.getQueryData([key, { type: 'mediaItem' }])
    }
  })
}
