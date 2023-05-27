import { call } from './ApiService'

export function selectAllNotification() {
  return call("/notification/selectAll", "GET", null);
}

export function deleteOneNotification(notificationDeleteDTO) {
  return call("/notification/deleteone", "POST", notificationDeleteDTO);
}
