import { useQueryCache, useMutation } from 'react-query'
import { postPageToPortfolio } from '../Backend/Fetch'
import { useStore } from './Store'

const portfolioIdSelector = (state) => state.portfolioId

export default function useAddPage() {
  const portfolioId = useStore(portfolioIdSelector)

  const cache = useQueryCache()

  return useMutation(
    ({ portfolioId, postDetails }) => postPageToPortfolio(portfolioId, postDetails),
    {
      onSuccess: () => {
        cache.removeQueries(['pages', { portfolioId, pageId: null }], { exact: true })
        cache.invalidateQueries(['pages', { portfolioId }])
      }
    }
  )
}
