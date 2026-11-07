import { createContext, useContext, useMemo, useState } from 'react'

const BookingContext = createContext(null)

export function BookingProvider({ children }) {
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState('9:30 AM')

  const value = useMemo(
    () => ({ selectedDoctor, setSelectedDoctor, selectedSlot, setSelectedSlot }),
    [selectedDoctor, selectedSlot],
  )

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export const useBooking = () => useContext(BookingContext)
