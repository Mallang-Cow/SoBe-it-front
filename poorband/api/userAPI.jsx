import { call } from './ApiService';

export function signin(userDTO) {
  return call("/auth/signin", "POST", userDTO)
}

export function signup(userDTO) {
  return call("/auth/signup", "POST", userDTO);
}

export function signout() {
  return call("/auth/signout", "POST", null);
}

export function checkId(userDTO) {
  return call("/auth/checkid", "POST", userDTO);
}

export function findId(findIdDTO) {
  return call("/auth/findid", "POST", findIdDTO);
}

export function findPassword(findPasswordDTO) {
  return call("/auth/findpassword", "POST", findPasswordDTO);
}
