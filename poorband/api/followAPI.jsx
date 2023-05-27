import { call } from './ApiService'

export function followUser(userId) {
  return call("/profile/addFollow", "POST", userId);
}
