import { call } from './ApiService'

export function smsAuthRequest(tel) {
  return call("/sms/smsAuthRequest", "POST", tel);
}

export function smsAuthOk(code) {
  return call("/sms/smsAuthOk", "POST", code);
}
