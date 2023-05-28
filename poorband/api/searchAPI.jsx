import { call } from './ApiService'

export function searchUser(searchText) {
  return call("/search/users", "POST", searchText);
}
