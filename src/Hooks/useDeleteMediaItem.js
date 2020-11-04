import { useQueryCache, useMutation } from 'react-query'
import { deleteMediaItem } from '../Backend/Fetch'

export default function useDeleteMediaItem() {
  const cache = useQueryCache()

  return useMutation(({ key }) => deleteMediaItem(key), {
    onSuccess: (_, variables) => {
      cache.removeQueries([variables.key])
    }
  })
}
