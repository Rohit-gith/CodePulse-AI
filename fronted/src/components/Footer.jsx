import { useTheme } from '../context/ThemeContext'

function Footer() {
  const { colors } = useTheme()

  return (
    <footer style={{
      ...styles.footer,
      background: colors.bg,
      borderTop: `0.5px solid ${colors.border}`,
    }}>

      <div style={styles.left}>
        <div style={styles.logo}>
          <div style={styles.logoBox}>
            <svg width="12" height="12" viewBox="0 0 24 24"
                 fill="none" stroke="#9FE1CB" strokeWidth="2.5">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </div>
          <span style={{...styles.logoText, color: colors.text}}>
            Code<span style={styles.accent}>Pulse</span> AI
          </span>
        </div>
        <p style={{...styles.copy, color: colors.textMuted}}>
          Built by Rohit — Full Stack + AI Project
        </p>
      </div>

      <div style={styles.center}>
        <a href="/" style={{
          ...styles.footerLink,
          color: colors.textMuted
        }}>Home</a>
        <a href="/analyzer" style={{
          ...styles.footerLink,
          color: colors.textMuted
        }}>Analyzer</a>
        <a href="/dashboard" style={{
          ...styles.footerLink,
          color: colors.textMuted
        }}>Dashboard</a>
      </div>

      <div style={styles.right}>
        <span style={{
          ...styles.techStack,
          color: colors.textMuted,
          border: `0.5px solid ${colors.border}`,
          background: colors.bg2,
        }}>
          React
        </span>
        <span style={{
          ...styles.techStack,
          color: colors.textMuted,
          border: `0.5px solid ${colors.border}`,
          background: colors.bg2,
        }}>
          Node.js
        </span>
        <span style={{
          ...styles.techStack,
          color: colors.textMuted,
          border: `0.5px solid ${colors.border}`,
          background: colors.bg2,
        }}>
          Groq AI
        </span>
        <span style={{
          ...styles.techStack,
          color: colors.textMuted,
          border: `0.5px solid ${colors.border}`,
          background: colors.bg2,
        }}>
          MySQL
        </span>
      </div>

    </footer>
  )
}

const styles = {
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '18px 40px',
    position: 'sticky',
    bottom: 0,
    zIndex: 100,
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  logoBox: {
    width: '24px',
    height: '24px',
    background: '#0F6E56',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: '14px',
    fontWeight: '500',
  },
  accent: {
    color: '#1D9E75',
  },
  copy: {
    fontSize: '12px',
  },
  center: {
    display: 'flex',
    gap: '24px',
  },
  footerLink: {
    fontSize: '12px',
    textDecoration: 'none',
  },
  right: {
    display: 'flex',
    gap: '8px',
  },
  techStack: {
    fontSize: '11px',
    padding: '3px 10px',
    borderRadius: '20px',
  },
}

export default Footer