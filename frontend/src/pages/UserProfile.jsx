import { useEffect, useState } from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { useAuth } from '../context/AuthContext'
import { getMyBookings } from '../services/bookingService'

export default function UserProfile() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    if (!user) return

    getMyBookings()
      .then(({ data }) => setBookings(data.bookings || []))
      .catch(() => setBookings([]))
  }, [user])

  if (!user) {
    return (
      <div className="page-shell">
        <Navbar />
        <main className="empty-state">
          <h1>Please log in to view your profile</h1>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="page-shell">
      <Navbar />

      <main className="profile-layout">
        <section className="profile-card">
          <div className="profile-avatar">{user.name?.charAt(0) || 'U'}</div>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <p className="profile-role">Role: {user.role}</p>
        </section>

        <section className="booking-history">
          <h2>My bookings</h2>

          {bookings.length === 0 ? (
            <p className="empty-copy">No appointments scheduled yet.</p>
          ) : (
            <div className="booking-list">
              {bookings.map((booking) => (
                <div key={booking._id || booking.id} className="booking-item">
                  <div>
                    <strong>{booking.doctor?.user?.name || 'Doctor'}</strong>
                    <p>{booking.appointmentDate} • {booking.appointmentTime}</p>
                  </div>
                  <span className="status-pill">{booking.status || 'pending'}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
