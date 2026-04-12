import { useState } from 'react'
import { loginAPI, saveToken, saveUser } from '../services/api'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email aur password dono bharo!')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const data = await loginAPI(email, password)

      if (data.status === 'success') {
        saveToken(data.data.token)
        saveUser(data.data.user)
        window.location.href = '/analyzer'
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Server se connect nahi ho pa raha!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>

      {/* Logo */}
      <div style={styles.logo}>
        <div style={styles.logoBox}>
          <svg width="14" height="14" viewBox="0 0 24 24"
               fill="none" stroke="#9FE1CB" strokeWidth="2.5">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
        </div>
        <span style={styles.logoText}>
          Code<span style={styles.accent}>Pulse</span> AI
        </span>
      </div>

      {/* Card */}
      <div style={styles.card}>

        <div style={styles.cardHeader}>
          <h2 style={styles.title}>Welcome back</h2>
          <p style={styles.subtitle}>
            Sign in to your account
          </p>
        </div>

        {/* Email */}
        <div style={styles.field}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="rohit@gmail.com"
            style={styles.input}
          />
        </div>

        {/* Password */}
        <div style={styles.field}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={styles.input}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
        </div>

        {/* Error */}
        {error && (
          <div style={styles.errorBox}>
            ⚠ {error}
          </div>
        )}

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            ...styles.btn,
            ...(loading ? styles.btnLoading : {})
          }}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>

        {/* Signup Link */}
        <p style={styles.switchText}>
          Account nahi hai?{' '}
          <a href="/signup" style={styles.switchLink}>
            Sign up
          </a>
        </p>

      </div>

    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0d0d0d',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '32px',
  },
  logoBox: {
    width: '30px',
    height: '30px',
    background: '#0F6E56',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#e5e5e5',
  },
  accent: {
    color: '#1D9E75',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    background: '#111',
    border: '0.5px solid #2a2a2a',
    borderRadius: '16px',
    padding: '32px',
  },
  cardHeader: {
    marginBottom: '28px',
  },
  title: {
    fontSize: '22px',
    fontWeight: '500',
    color: '#e5e5e5',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    fontSize: '13px',
    color: '#555',
    marginTop: '6px',
  },
  field: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    fontSize: '12px',
    color: '#888',
    marginBottom: '8px',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    background: '#0d0d0d',
    border: '0.5px solid #2a2a2a',
    borderRadius: '8px',
    padding: '11px 14px',
    fontSize: '14px',
    color: '#e5e5e5',
    outline: 'none',
    boxSizing: 'border-box',
  },
  errorBox: {
    padding: '10px 14px',
    background: '#1a0a0a',
    border: '0.5px solid #3a1515',
    borderRadius: '8px',
    color: '#E24B4A',
    fontSize: '12px',
    marginBottom: '16px',
  },
  btn: {
    width: '100%',
    padding: '12px',
    background: '#0F6E56',
    color: '#E1F5EE',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '8px',
  },
  btnLoading: {
    background: '#0a3d2e',
    cursor: 'not-allowed',
    color: '#1D9E75',
  },
  switchText: {
    textAlign: 'center',
    fontSize: '13px',
    color: '#555',
    marginTop: '20px',
  },
  switchLink: {
    color: '#1D9E75',
    textDecoration: 'none',
    fontWeight: '500',
  },
}

export default Login