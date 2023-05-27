import { call } from './ApiService'

export function followUser(userId) {
  return call("/profile/addFollow", "POST", userId);
}

export function unFollowUser(userId) {
    return call("/profile/deleteFollowing", "POST", userId);
}
