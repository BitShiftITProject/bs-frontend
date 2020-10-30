import { queryCache, useMutation } from 'react-query'
import { patchPage } from '../Backend/Fetch'

export default function useEditPage() {
  return useMutation(({ pageId, patchDetails }) => patchPage(pageId, patchDetails), {
    onSuccess: (data, variables) => queryCache.invalidateQueries(['pages', variables.pageId])
  })
}
