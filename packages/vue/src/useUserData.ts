import { useSelector } from '@xstate/vue'

import { useAuthInterpreter } from './useAuthInterpreter'

/**
 * Use the composable `useUserData` to get the user data of the user.
 *
 * @example
 * ```tsx
 * const userData = useUserData();
 * ```
 * 
   * @example Example of user data
```json
{
  "avatarUrl": "https://s.gravatar.com/avatar",
  "createdAt": "2022-04-11T16:33:14.780439+00:00",
  "defaultRole": "user",
  "displayName": "John Doe",
  "email": "john@nhost.io",
  "id": "05e054c7-a722-42e7-90a6-3f77a2f118c8",
  "isAnonymous": false,
  "locale": "en",
  "metadata": {
    "lastName": "Doe",
    "firstName": "John"
  },
  "roles": ["user", "me"]
}
```
 *
 * @docs https://docs.nhost.io/reference/vue/use-user-data
 */
export const useUserData = () => {
  const service = useAuthInterpreter()
  return useSelector(
    service.value,
    (state) => state.context.user,
    (a, b) => JSON.stringify(a) === JSON.stringify(b)
  )
}