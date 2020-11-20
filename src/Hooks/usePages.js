import { useQuery, useQueryCache } from 'react-query'
import { useLocation } from 'react-router-dom'
import { getPortfolioPages } from '../Backend/Fetch'
import useEditPortfolio from './useEditPortfolio'
import usePortfolio from './usePortfolio'

export default function usePages(portfolioId) {
  const cache = useQueryCache()
  const { pathname } = useLocation()
  const { data: portfolio } = usePortfolio(portfolioId)
  const [editPortfolio] = useEditPortfolio()

  return useQuery({
    queryKey: ['pages', { portfolioId }],
    queryFn: () => getPortfolioPages(portfolioId),
    config: {
      enabled: ['portfolios', portfolioId],
      staleTime: 3 * 60 * 1000,
      onSuccess: (data) => {
        // get the current portfolio and the page order (which is an array of page IDs to tell the
        // app which page comes first)
        const pageOrder = portfolio.pageOrder

        // if page order exists, sort the pages in that way, otherwise patch the portfolio to set
        // page order as an array of page IDs ordered in the way that they currently are
        let pages = data
        if (!pageOrder) {
          const patchDetails = { pageOrder: pages.map((p) => p.id) }
          editPortfolio({ portfolioId, patchDetails })
        } else {
          pages.sort((a, b) => {
            return pageOrder.indexOf(a.id) - pageOrder.indexOf(b.id)
          })
        }

        data.forEach((page) => {
          if (page) cache.setQueryData(['pages', { portfolioId, pageId: page.id }], page)
        })
      },
      refetchOnWindowFocus: pathname.includes('public') ? 'always' : true
    }
  })
}
