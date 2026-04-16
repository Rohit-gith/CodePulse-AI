const BASE_URL = import.meta.env.VITE_API_URL || 
                 'http://localhost:5000/api'

// Token save karna
export const saveToken = (token) => {
  localStorage.setItem('codepulse_token', token)
}

// Token lena
export const getToken = () => {
  return localStorage.getItem('codepulse_token')
}

// Token hatana
export const removeToken = () => {
  localStorage.removeItem('codepulse_token')
}

// User save karna
export const saveUser = (user) => {
  localStorage.setItem('codepulse_user', JSON.stringify(user))
}

// User lena
export const getUser = () => {
  const user = localStorage.getItem('codepulse_user')
  return user ? JSON.parse(user) : null
}

// User hatana
export const removeUser = () => {
  localStorage.removeItem('codepulse_user')
}

// ✅ SIGNUP
export const signupAPI = async (name, email, password) => {
  const response = await fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  })
  return response.json()
}

// ✅ LOGIN
export const loginAPI = async (email, password) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  return response.json()
}

// ✅ ANALYZE CODE
export const analyzeAPI = async (code, language) => {
  const token = getToken()
  const response = await fetch(`${BASE_URL}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ code, language })
  })
  return response.json()
}
// ✅ History lo
export const getHistoryAPI = async () => {
  const token = getToken()
  const response = await fetch(`${BASE_URL}/history`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return response.json()
}

// ✅ Stats lo
export const getStatsAPI = async () => {
  const token = getToken()
  const response = await fetch(`${BASE_URL}/stats`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return response.json()
}