import { call } from './ApiService'

export function searchUser(searchUserDTO) {
  return call("/search/users", "POST", searchUserDTO);
}
