import { useQuery } from 'react-query'
import { getUser } from '../Backend/Fetch'

export default function useUser() {
  return useQuery({
    queryKey: 'user',
    queryFn: () => getUser(),
    config: { staleTime: 3 * 60 * 1000 }
  })
}
