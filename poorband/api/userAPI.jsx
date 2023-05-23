import { call } from './ApiService'

export function signin(userDTO) {
  return call("/auth/signin", "POST", userDTO)
}

export function signup(userDTO) {
  return call("/auth/signup", "POST", userDTO);
}
