import { useQueryCache, useMutation } from 'react-query'
import { patchPage } from '../Backend/Fetch'
import { useStore } from './Store'

const portfolioIdSelector = (state) => state.portfolioId

export default function useEditPage() {
  const portfolioId = useStore(portfolioIdSelector)
  const cache = useQueryCache()

  return useMutation(
    ({ pageId, patchDetails }) => {
      return patchPage(pageId, patchDetails)
    },
    {
      onSuccess: (data, variables) => {
        // cache.invalidateQueries(['pages', { portfolioId }], { active: true })
        // cache.refetchQueries(['pages', { portfolioId, pageId:
        // variables.pageId }], { exact: true })
        data.json().then((page) => {
          cache.setQueryData(
            ['pages', { portfolioId }],
            cache.getQueryData(['pages', { portfolioId }]).map((p) => {
              if (p.id === variables.pageId) {
                // console.log(p)
                return page
              } else {
                return p
              }
            })
          )

          cache.setQueryData(['pages', { portfolioId, pageId: variables.pageId }], page)
        })
      }
    }
  )
}
