import { useQueryCache, useMutation } from 'react-query'
import { patchPortfolio } from '../Backend/Fetch'

export default function useEditPortfolio() {
  const cache = useQueryCache()

  return useMutation(
    ({ portfolioId, patchDetails }) => {
      // console.log('Patching the portfolio:', portfolioId, 'with', patchDetails)
      return patchPortfolio(portfolioId, patchDetails)
    },
    {
      onSuccess: (data, variables) => {
        data.json().then((portfolio) => {
          cache.setQueryData(
            ['portfolios'],
            cache.getQueryData(['portfolios']).map((p) => {
              if (p.id === variables.portfolioId) {
                return portfolio
              } else {
                return p
              }
            })
          )

          cache.setQueryData(['portfolios', { id: variables.portfolioId }], portfolio)
        })

        // console.log('Edited portfolio:', cache.getQueryData(['portfolios',
        // {id: variables.portfolioId}]))
        // cache.invalidateQueries(['portfolios'])
        // cache.invalidateQueries(['portfolios', {id: variables.portfolioId}], { exact: true })
      }
    }
  )
}
