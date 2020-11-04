import { useQuery } from 'react-query'
import { getUser, logoutNoReload } from '../Backend/Fetch'

export default function useUser() {
  return useQuery({
    queryKey: 'user',
    queryFn: () => getUser(),
    config: {
      staleTime: 3 * 60 * 1000,
      onSuccess: (data) => {
        if (!data) logoutNoReload()
      },
      onError: () => {
        logoutNoReload()
      }
    }
  })
}
