import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { useAuth } from '../context/AuthContext'

export default function AdminDashboard() {
  const { user } = useAuth()

  if (!user || user.role !== 'admin') {
    return (
      <div className="page-shell">
        <Navbar />
        <main className="empty-state">
          <h1>Admin access required</h1>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="page-shell">
      <Navbar />

      <main className="admin-grid">
        <section className="admin-panel">
          <span className="eyebrow">Overview</span>
          <h1>Administration dashboard</h1>
          <p>Track patient consultations, manage doctors, and review appointment activity.</p>
        </section>

        <div className="stats-row admin-stats">
          <div>
            <strong>129</strong>
            <span>New bookings</span>
          </div>
          <div>
            <strong>42</strong>
            <span>Specialists</span>
          </div>
          <div>
            <strong>17</strong>
            <span>Open cases</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
