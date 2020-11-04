import { useQuery, useQueryCache } from 'react-query'
import { getDataUrl, getFile } from '../Backend/Fetch'

export default function useFile(key, editing) {
  const cache = useQueryCache()
  const mediaItem = cache.getQueryData([key, { type: 'mediaItem' }])

  return useQuery({
    queryKey: [key, { type: 'file' }],
    queryFn: () => {
      if (editing) {
        return getFile(key, mediaItem)
      }
      return getDataUrl(key, mediaItem)
    },
    config: {
      enabled: key && mediaItem,
      staleTime: 3 * 60 * 1000,
      initialData: () => cache.getQueryData([key, { type: 'file' }]),
      onSuccess: (data) => {
        // console.log(`Loaded ${editing ? 'FILE' : 'DATA URL'}: `, data)
      },
      onError: (err) => {
        // console.log(`Data ${editing ? 'FILE' : 'DATA URL'} fetching FAILED:`, err)
      }
    }
  })
}
