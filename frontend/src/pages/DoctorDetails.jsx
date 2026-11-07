import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { appointmentTimes } from '../utils/mockData'
import { useBooking } from '../context/BookingContext'
import { getDoctorById } from '../services/doctorService'

export default function DoctorDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { setSelectedDoctor, setSelectedSlot } = useBooking()
  const [doctor, setDoctor] = useState(null)

  useEffect(() => {
    getDoctorById(id)
      .then(({ data }) => setDoctor(data.doctor || null))
      .catch(() => setDoctor(null))
  }, [id])

  const [booking, setBooking] = useState({
    date: '2026-10-07',
    time: '9:30 AM',
    reason: '',
  })

  if (!doctor) {
    return (
      <div className="page-shell">
        <Navbar />
        <main className="empty-state">
          <h1>Doctor not found</h1>
          <button type="button" className="primary-button" onClick={() => navigate('/doctors')}>
            Back to doctors
          </button>
        </main>
        <Footer />
      </div>
    )
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setBooking((current) => ({ ...current, [name]: value }))
  }

  const handleConfirm = (event) => {
    event.preventDefault()
    setSelectedDoctor(doctor)
    setSelectedSlot(booking.time)
    navigate('/login')
  }

  return (
    <div className="page-shell">
      <Navbar />

      <main className="doctor-detail-layout">
        <section className="doctor-profile-card">
          <div className={`doctor-badge large ${doctor.color}`}>{doctor.name.split(' ')[1][0]}</div>
          <h1>{doctor.name}</h1>
          <p className="doctor-specialty">{doctor.specialty}</p>
          <p className="doctor-meta">{doctor.experience} experience</p>
          <p className="doctor-bio">{doctor.bio}</p>
          <div className="detail-row">
            <span className="availability-pill">{doctor.available}</span>
            <span className="fee-pill">Consultation fee: {doctor.fee}</span>
          </div>
        </section>

        <form className="booking-form detail-form" onSubmit={handleConfirm}>
          <h2>Book appointment</h2>

          <label>
            Preferred date
            <input type="date" name="date" value={booking.date} onChange={handleChange} />
          </label>

          <label>
            Time slot
            <select name="time" value={booking.time} onChange={handleChange}>
              {appointmentTimes.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </label>

          <label>
            Reason for visit
            <textarea
              name="reason"
              rows="4"
              placeholder="Tell us about your symptoms or goals"
              value={booking.reason}
              onChange={handleChange}
            />
          </label>

          <button type="submit" className="primary-button full-width">
            Continue to login
          </button>
        </form>
      </main>

      <Footer />
    </div>
  )
}
