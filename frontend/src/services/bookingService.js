import api from './api'

export const getMyBookings = () => api.get('/bookings/me')
export const createBooking = (payload) => api.post('/bookings', payload)
