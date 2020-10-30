import { queryCache, useMutation } from 'react-query'
import { deletePage } from '../Backend/Fetch'

export default function useDeletePage() {
  return useMutation(({ pageId }) => deletePage(pageId), {
    onSuccess: (data, variables) => {
      queryCache.invalidateQueries('pages')
    }
  })
}
