import { queryCache, useMutation } from 'react-query'
import { patchUser } from '../Backend/Fetch'

export default function useEditPortfolio() {
  return useMutation(({ patchDetails }) => patchUser(patchDetails), {
    onSuccess: () => queryCache.invalidateQueries('user')
  })
}
