import api from './api'

export const getDoctors = () => api.get('/doctors')
export const getDoctorById = (id) => api.get(`/doctors/${id}`)
export const createDoctorProfile = (payload) => api.post('/doctors', payload)
