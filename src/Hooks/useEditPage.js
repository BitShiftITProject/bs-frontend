import { queryCache, useMutation } from 'react-query'
import { patchPage } from '../Backend/Fetch'

export default function useEditPage() {
  return useMutation(({ pageId, patchDetails }) => patchPage(pageId, patchDetails), {
    onSuccess: (data, variables) => {
      console.log('Edited Page ID:', variables.pageId)
      queryCache.invalidateQueries(['pages', variables.pageId], {
        exact: true,
        refetchInactive: true
      })
    }
  })
}
