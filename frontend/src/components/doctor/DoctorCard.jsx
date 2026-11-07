import { Link } from 'react-router-dom'

export default function DoctorCard({ doctor }) {
  return (
    <article className="doctor-card">
      <div className={`doctor-badge ${doctor.color}`}>{doctor.name.split(' ')[1][0]}</div>
      <div className="doctor-card-top">
        <h3>{doctor.name}</h3>
        <span className="rating">★ {doctor.rating}</span>
      </div>
      <p className="doctor-specialty">{doctor.specialty}</p>
      <p className="doctor-meta">{doctor.experience} experience</p>
      <div className="availability-row">
        <span className="availability-pill">{doctor.available}</span>
      </div>
      <Link to={`/doctors/${doctor.id}`} className="secondary-button small-button inline-button">
        Book visit
      </Link>
    </article>
  )
}
