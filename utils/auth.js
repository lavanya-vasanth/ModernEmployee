// utils/auth.js
export function isAdmin(username, password) {
  return username === 'admin' && password === 'admin123';
}
