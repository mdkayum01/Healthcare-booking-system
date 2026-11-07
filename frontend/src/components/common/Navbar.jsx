import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="topbar">
      <Link to="/" className="brand-wrap" aria-label="Go to home page">
        <div className="brand-mark">+</div>
        <div>
          <p className="tagline">CareConnect</p>
          <p className="sub-tag">Healthcare booking</p>
        </div>
      </Link>

      <nav className="main-nav" aria-label="Main navigation">
        <Link to="/">Home</Link>
        <Link to="/doctors">Doctors</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/admin">Admin</Link>
      </nav>

      {user ? (
        <button type="button" className="primary-button nav-button" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <Link to="/login" className="primary-button nav-button inline-button">
          Login
        </Link>
      )}
    </header>
  )
}
