import { getUser, removeToken, removeUser } from '../services/api'
import { useTheme } from '../context/ThemeContext'

const getAvatarColor = (name) => {
  const colors = [
    { bg: '#0a1f18', border: '#1D9E75', text: '#1D9E75' },
    { bg: '#1a0a1a', border: '#9F77DD', text: '#9F77DD' },
    { bg: '#1a0a0a', border: '#E24B4A', text: '#E24B4A' },
    { bg: '#0a0f1a', border: '#378ADD', text: '#378ADD' },
  ]
  return colors[name.charCodeAt(0) % colors.length]
}

const getInitials = (name) => {
  const parts = name.trim().split(' ')
  return parts.length >= 2
    ? parts[0][0].toUpperCase() + parts[1][0].toUpperCase()
    : parts[0][0].toUpperCase()
}

function Navbar() {
  const user = getUser()
  const { isDark, toggleTheme, colors } = useTheme()

  const handleLogout = () => {
    removeToken()
    removeUser()
    window.location.href = '/'
  }

  return (
    <nav style={{
      ...styles.nav,
      background: colors.bg,
      borderBottom: `0.5px solid ${colors.border}`,
    }}>

      {/* Logo */}
      <div style={styles.logo}>
        <div style={styles.logoBox}>
          <svg width="14" height="14" viewBox="0 0 24 24"
               fill="none" stroke="#9FE1CB" strokeWidth="2.5">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
        </div>
        <span style={{...styles.logoText, color: colors.text}}>
          Code<span style={styles.logoAccent}>Pulse</span> AI
        </span>
      </div>

      {/* Links */}
      <div style={styles.links}>
        <a href="/" style={{...styles.link, color: colors.textSub}}>
          Home
        </a>
        <a href="/#features"
           style={{...styles.link, color: colors.textSub}}>
          Features
        </a>
        <a href="/analyzer"
           style={{...styles.link, color: colors.textSub}}>
          Analyzer
        </a>
        {user && (
          <a href="/dashboard"
             style={{...styles.link, color: colors.textSub}}>
            Dashboard
          </a>
        )}
      </div>

      {/* Right */}
      <div style={styles.right}>

        {/* 🌙/☀️ Toggle Button */}
        <button
          onClick={toggleTheme}
          style={{
            ...styles.themeToggle,
            background: colors.bg2,
            border: `0.5px solid ${colors.border}`,
          }}
          title={isDark ? 'Switch to Light' : 'Switch to Dark'}
        >
          {isDark ? '☀️' : '🌙'}
        </button>

        {user ? (
          <>
            <div style={{
              ...styles.userCard,
              background: colors.bg2,
              border: `0.5px solid ${colors.border}`,
            }}>
              <div style={{
                ...styles.avatar,
                background: getAvatarColor(user.name).bg,
                border: `1.5px solid ${getAvatarColor(user.name).border}`,
                color: getAvatarColor(user.name).text,
              }}>
                {getInitials(user.name)}
              </div>
              <div style={styles.userMeta}>
                <span style={{
                  ...styles.userName,
                  color: colors.text
                }}>
                  {user.name}
                </span>
                <span style={{
                  ...styles.userEmail,
                  color: colors.textMuted
                }}>
                  {user.email}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              style={{
                ...styles.logoutBtn,
                border: `0.5px solid ${colors.border}`,
                color: colors.textMuted,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </>
        ) : (
          <>
            <a href="/login"
               style={{...styles.signin, color: colors.textSub}}>
              Sign in
            </a>
            <a href="/signup" style={styles.cta}>
              Start free
            </a>
          </>
        )}
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 40px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
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
  },
  logoAccent: {
    color: '#1D9E75',
  },
  links: {
    display: 'flex',
    gap: '28px',
  },
  link: {
    fontSize: '13px',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  right: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  themeToggle: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '16px',
  },
  userCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    borderRadius: '12px',
    padding: '6px 14px 6px 6px',
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '500',
    letterSpacing: '0.5px',
    flexShrink: 0,
  },
  userMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1px',
  },
  userName: {
    fontSize: '13px',
    fontWeight: '500',
    lineHeight: '1.2',
  },
  userEmail: {
    fontSize: '11px',
    lineHeight: '1.2',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: 'none',
    fontSize: '13px',
    padding: '8px 14px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  signin: {
    fontSize: '13px',
    textDecoration: 'none',
  },
  cta: {
    background: '#0F6E56',
    color: '#E1F5EE',
    padding: '8px 18px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '500',
    textDecoration: 'none',
  },
}

export default Navbar