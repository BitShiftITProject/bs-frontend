import { useQueryCache, useMutation } from 'react-query'
import { patchUser } from '../Backend/Fetch'

export default function useEditUser() {
  const cache = useQueryCache()

  return useMutation(({ patchDetails }) => patchUser(patchDetails), {
    onSuccess: (data) => cache.invalidateQueries('user')
  })
}
