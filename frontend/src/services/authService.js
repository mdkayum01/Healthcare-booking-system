import api from './api'

export const loginUser = (payload) => api.post('/auth/login', payload)
export const registerUser = (payload) => api.post('/auth/register', payload)
export const getCurrentUser = () => api.get('/auth/me')
