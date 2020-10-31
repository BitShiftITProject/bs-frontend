import { useQueryCache, useMutation } from 'react-query'
import { deletePage } from '../Backend/Fetch'
import { useStore } from './Store'

const portfolioIdSelector = (state) => state.portfolioId

export default function useDeletePage() {
  const portfolioId = useStore(portfolioIdSelector)
  const cache = useQueryCache()

  return useMutation(({ pageId }) => deletePage(pageId), {
    onSuccess: (_, variables) => {
      cache.invalidateQueries(['pages', { portfolioId }])
      cache.removeQueries(['pages', { portfolioId, pageId: variables.pageId }], { exact: true })
    }
  })
}
