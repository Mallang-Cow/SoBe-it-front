import { call } from './ApiService'

export function signin(userDTO) {
  return call("/auth/signin", "POST", userDTO)
}
