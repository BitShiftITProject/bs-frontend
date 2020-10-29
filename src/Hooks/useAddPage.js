import { queryCache, useMutation } from 'react-query'
import { postPageToPortfolio } from '../Backend/Fetch'

export default function useAddPage() {
  return useMutation(
    ({ portfolioId, postDetails }) => postPageToPortfolio(portfolioId, postDetails),
    {
      onSuccess: () => queryCache.invalidateQueries('pages')
    }
  )
}
