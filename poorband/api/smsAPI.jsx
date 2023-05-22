import { call } from './ApiService'

export function smsAuthRequest(tel) {
  return call("/sms/smsAuthRequest", "POST", tel);
}
