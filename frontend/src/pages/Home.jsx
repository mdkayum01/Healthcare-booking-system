import { Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import DoctorCard from '../components/doctor/DoctorCard'
import { doctors, serviceHighlights, testimonials } from '../utils/mockData'

export default function Home() {
  return (
    <div className="page-shell">
      <Navbar />

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <span className="eyebrow">Trusted medical care</span>
            <h1>Book a specialist visit in minutes.</h1>
            <p>
              Manage appointments, access digital care plans, and connect with trusted doctors for both urgent and routine care.
            </p>

            <div className="hero-actions">
              <Link to="/doctors" className="primary-button inline-button">
                Schedule consult
              </Link>
              <Link to="/doctors" className="secondary-button inline-button">
                View doctors
              </Link>
            </div>

            <div className="mini-stats" aria-label="Healthcare metrics">
              <div>
                <strong>24k+</strong>
                <span>Patients helped</span>
              </div>
              <div>
                <strong>4.9/5</strong>
                <span>Customer rating</span>
              </div>
              <div>
                <strong>15 min</strong>
                <span>Avg. response</span>
              </div>
            </div>
          </div>

          <div className="hero-card">
            <div className="appointment-preview">
              <div className="card-header">
                <span className="status-dot" />
                <span>Live appointment</span>
              </div>

              <div className="doctor-avatar">AR</div>
              <h2>Dr. Aisha Rahman</h2>
              <p>Cardiologist • 12 yrs experience</p>

              <div className="appointment-meta">
                <span>Tue, 9:30 AM</span>
                <span>Virtual consult</span>
              </div>

              <button type="button" className="primary-button full-width">
                Confirm visit
              </button>
            </div>
          </div>
        </section>

        <section className="stats-row" aria-label="Service stats">
          <div>
            <strong>320+</strong>
            <span>Active specialists</span>
          </div>
          <div>
            <strong>98%</strong>
            <span>Appointments confirmed</span>
          </div>
          <div>
            <strong>1.2M</strong>
            <span>Secure health records</span>
          </div>
          <div>
            <strong>7 days</strong>
            <span>Virtual follow-up cycle</span>
          </div>
        </section>

        <section className="doctors-section" id="doctors">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Top doctors</span>
              <h2>Meet your care team</h2>
            </div>
          </div>

          <div className="doctor-grid">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </section>

        <section className="booking-section" id="booking">
          <div className="booking-copy">
            <span className="eyebrow">Fast booking</span>
            <h2>Reserve your consultation</h2>
            <ul className="service-list" id="services">
              {serviceHighlights.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          <div className="booking-form summary-box">
            <h3>Why patients choose us</h3>
            <p>
              Booking is simple, fast, and designed around your health goals. We help you move from inquiry to consult with minimal friction.
            </p>
            <ul className="summary-list">
              <li>Verified specialists</li>
              <li>Digital reminders</li>
              <li>Same-day availability</li>
            </ul>
            <Link to="/register" className="primary-button inline-button full-width center-button">
              Create account
            </Link>
          </div>
        </section>

        <section className="reviews-section" id="reviews">
          <div className="section-heading left-align">
            <div>
              <span className="eyebrow">Patient stories</span>
              <h2>Why people trust CareConnect</h2>
            </div>
          </div>

          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="testimonial-card">
                <div className="stars" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <p>{testimonial.text}</p>
                <strong>{testimonial.name}</strong>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
