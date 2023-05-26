import { call } from './ApiService'

export function smsAuthRequest(tel) {
  return call("/sms/smsAuthRequest", "POST", tel);
}

export function smsAuthOk(data) {
  return call("/sms/smsAuthOk", "POST", data);
}
