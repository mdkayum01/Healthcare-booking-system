import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    try {
      await login(form)
      navigate('/profile')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    }
  }

  return (
    <div className="page-shell auth-shell">
      <Navbar />

      <main className="auth-card-wrap">
        <form className="auth-card" onSubmit={handleSubmit}>
          <span className="eyebrow">Welcome back</span>
          <h1>Login to your account</h1>

          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>

          <label>
            Password
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </label>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="primary-button full-width">
            Login
          </button>

          <p className="auth-switch">
            Don&apos;t have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </main>

      <Footer />
    </div>
  )
}
