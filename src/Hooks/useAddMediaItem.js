import {
  // useQueryCache,
  useMutation
} from 'react-query'
import { postMediaContent } from '../Backend/Fetch'

export default function useAddMediaItem() {
  // const cache = useQueryCache()

  return useMutation(({ username, postDetails }) => postMediaContent(username, postDetails), {
    onSuccess: (data) => {
      // console.log('Media Item uploaded:', data)
      return data.json().then((response) => {
        return response.key
      })
    }
  })
}
