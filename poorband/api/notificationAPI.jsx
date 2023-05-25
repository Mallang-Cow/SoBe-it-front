import { call } from './ApiService'

export function selectAllNotification() {
    return call("/notification/selectAll", "GET", null);
}
