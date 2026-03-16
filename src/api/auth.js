import { get, post } from './client'

export function login(payload) {
  return post('/auth/authToken.php', payload)
}

export function register(payload) {
  return post('/auth/register.php', payload)
}

export function verifyEmail(token) {
  return get(`/auth/verifyEmail.php?token=${encodeURIComponent(token)}`)
}

export function forgotPassword(payload) {
  return post('/auth/forgotPassword.php', payload)
}

export function resetPassword(payload) {
  return post('/auth/resetPassword.php', payload)
}

export function refreshToken() {
  return post('/auth/refreshToken.php', {})
}

export function logout() {
  return post('/auth/logout.php', {})
}
