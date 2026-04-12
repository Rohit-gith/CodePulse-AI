import { useState, useEffect } from 'react'
import { getHistoryAPI, getStatsAPI, getUser } from '../services/api'

function Dashboard() {
  const [history, setHistory] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const user = getUser()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [historyRes, statsRes] = await Promise.all([
        getHistoryAPI(),
        getStatsAPI()
      ])
      if (historyRes.status === 'success') {
        setHistory(historyRes.data.history)
      }
      if (statsRes.status === 'success') {
        setStats(statsRes.data.stats)
      }
    } catch (err) {
      console.log('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const getAvatarColor = (name) => {
    const colors = [
      { bg: '#0a1f18', border: '#1D9E75', text: '#1D9E75' },
      { bg: '#1a0a1a', border: '#9F77DD', text: '#9F77DD' },
      { bg: '#1a0a0a', border: '#E24B4A', text: '#E24B4A' },
      { bg: '#0a0f1a', border: '#378ADD', text: '#378ADD' },
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  const getInitials = (name) => {
    const parts = name.trim().split(' ')
    if (parts.length >= 2) {
      return parts[0].charAt(0).toUpperCase() +
             parts[1].charAt(0).toUpperCase()
    }
    return parts[0].charAt(0).toUpperCase()
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getLangColor = (lang) => {
    const colors = {
      python: '#3572A5',
      javascript: '#F7DF1E',
      java: '#b07219',
      cpp: '#f34b7d',
      c: '#555555',
    }
    return colors[lang] || '#888'
  }

  if (loading) {
    return (
      <div style={styles.loadingPage}>
        <div style={styles.loadingDots}>
          <div style={styles.loadDot}></div>
          <div style={{...styles.loadDot, animationDelay:'0.2s'}}></div>
          <div style={{...styles.loadDot, animationDelay:'0.4s'}}></div>
        </div>
        <p style={styles.loadingText}>Loading dashboard...</p>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.3; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>

          {/* Avatar + Name */}
          <div style={styles.userCard}>
            {user && (
              <>
                <div style={{
                  ...styles.avatar,
                  background: getAvatarColor(user.name).bg,
                  border: `1.5px solid ${getAvatarColor(user.name).border}`,
                  color: getAvatarColor(user.name).text,
                }}>
                  {getInitials(user.name)}
                </div>
                <div>
                  <h1 style={styles.welcomeText}>
                    Welcome back, {user.name.split(' ')[0]}!
                  </h1>
                  <p style={styles.emailText}>{user.email}</p>
                </div>
              </>
            )}
          </div>

        </div>

        <div style={styles.headerRight}>
          <a href="/analyzer" style={styles.analyzeBtn}>
            ▶ &nbsp;New Analysis
          </a>
          <a href="/" style={styles.homeBtn}>
            ← Home
          </a>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>TOTAL ANALYSES</p>
          <p style={styles.statValue}>
            {stats?.totalAnalyses || 0}
          </p>
          <p style={styles.statSub}>Code reviews done</p>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>LANGUAGES USED</p>
          <p style={styles.statValue}>
            {stats?.languagesUsed || 0}
          </p>
          <p style={styles.statSub}>Different languages</p>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>RECENT ACTIVITY</p>
          <p style={styles.statValue}>
            {history.length > 0
              ? formatDate(history[0].created_at).split(',')[0]
              : 'No activity'}
          </p>
          <p style={styles.statSub}>Last analysis</p>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>MEMBER SINCE</p>
          <p style={styles.statValue}>
            {new Date().toLocaleDateString('en-IN', {
              month: 'short',
              year: 'numeric'
            })}
          </p>
          <p style={styles.statSub}>Account created</p>
        </div>
      </div>

      {/* Main Grid */}
      <div style={styles.mainGrid}>

        {/* Left — History List */}
        <div style={styles.historyPanel}>
          <div style={styles.panelHeader}>
            <span style={styles.panelTitle}>Recent Analyses</span>
            <span style={styles.panelCount}>
              {history.length} total
            </span>
          </div>

          {history.length === 0 ? (
            <div style={styles.emptyState}>
              <p style={styles.emptyTitle}>No analyses yet</p>
              <p style={styles.emptyDesc}>
                Start analyzing your code!
              </p>
              <a href="/analyzer" style={styles.emptyBtn}>
                Analyze now
              </a>
            </div>
          ) : (
            <div style={styles.historyList}>
              {history.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelected(item)}
                  style={{
                    ...styles.historyItem,
                    ...(selected?.id === item.id
                      ? styles.historyItemActive
                      : {})
                  }}
                >
                  <div style={styles.historyTop}>
                    <div style={styles.langBadge}>
                      <div style={{
                        ...styles.langDot,
                        background: getLangColor(item.language)
                      }}></div>
                      {item.language}
                    </div>
                    <span style={styles.historyDate}>
                      {formatDate(item.created_at)}
                    </span>
                  </div>
                  <pre style={styles.codePreview}>
                    {item.code.substring(0, 60)}
                    {item.code.length > 60 ? '...' : ''}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right — Selected Analysis */}
        <div style={styles.resultPanel}>
          <div style={styles.panelHeader}>
            <span style={styles.panelTitle}>Analysis Detail</span>
            {selected && (
              <div style={styles.langBadge}>
                <div style={{
                  ...styles.langDot,
                  background: getLangColor(selected.language)
                }}></div>
                {selected.language}
              </div>
            )}
          </div>

          {!selected ? (
            <div style={styles.emptyState}>
              <svg width="32" height="32" viewBox="0 0 24 24"
                   fill="none" stroke="#333" strokeWidth="1.5">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
              <p style={styles.emptyTitle}>
                Select an analysis
              </p>
              <p style={styles.emptyDesc}>
                Click any item on the left to view details
              </p>
            </div>
          ) : (
            <div style={styles.detailBox}>

              {/* Code */}
              <div style={styles.detailSection}>
                <p style={styles.detailLabel}>CODE</p>
                <pre style={styles.detailCode}>
                  {selected.code}
                </pre>
              </div>

              {/* Result */}
              <div style={styles.detailSection}>
                <p style={styles.detailLabel}>AI ANALYSIS</p>
                <pre style={styles.detailResult}>
                  {selected.result}
                </pre>
              </div>

            </div>
          )}
        </div>

      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>

    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0d0d0d',
    padding: '32px 40px',
  },
  loadingPage: {
    minHeight: '100vh',
    background: '#0d0d0d',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
  },
  loadingDots: {
    display: 'flex',
    gap: '8px',
  },
  loadDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#1D9E75',
    animation: 'pulse 1s ease-in-out infinite',
  },
  loadingText: {
    fontSize: '13px',
    color: '#555',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    paddingBottom: '24px',
    borderBottom: '0.5px solid #2a2a2a',
  },
  headerLeft: {},
  userCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  avatar: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0.5px',
    flexShrink: 0,
  },
  welcomeText: {
    fontSize: '20px',
    fontWeight: '500',
    color: '#e5e5e5',
    letterSpacing: '-0.3px',
  },
  emailText: {
    fontSize: '12px',
    color: '#555',
    marginTop: '3px',
  },
  headerRight: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  analyzeBtn: {
    background: '#0F6E56',
    color: '#E1F5EE',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '500',
    textDecoration: 'none',
  },
  homeBtn: {
    background: 'none',
    border: '0.5px solid #2a2a2a',
    color: '#555',
    padding: '10px 16px',
    borderRadius: '8px',
    fontSize: '13px',
    textDecoration: 'none',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '24px',
  },
  statCard: {
    background: '#111',
    border: '0.5px solid #2a2a2a',
    borderRadius: '12px',
    padding: '20px',
  },
  statLabel: {
    fontSize: '11px',
    color: '#555',
    letterSpacing: '1px',
    fontWeight: '500',
    marginBottom: '10px',
  },
  statValue: {
    fontSize: '24px',
    fontWeight: '500',
    color: '#e5e5e5',
    letterSpacing: '-0.5px',
  },
  statSub: {
    fontSize: '11px',
    color: '#444',
    marginTop: '4px',
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.5fr',
    gap: '16px',
    height: 'calc(100vh - 320px)',
  },
  historyPanel: {
    background: '#111',
    border: '0.5px solid #2a2a2a',
    borderRadius: '12px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  resultPanel: {
    background: '#111',
    border: '0.5px solid #2a2a2a',
    borderRadius: '12px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  panelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    borderBottom: '0.5px solid #2a2a2a',
    background: '#151515',
  },
  panelTitle: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#ccc',
  },
  panelCount: {
    fontSize: '11px',
    color: '#555',
    background: '#1a1a1a',
    padding: '3px 10px',
    borderRadius: '20px',
  },
  historyList: {
    flex: 1,
    overflowY: 'auto',
  },
  historyItem: {
    padding: '16px 20px',
    borderBottom: '0.5px solid #1a1a1a',
    cursor: 'pointer',
  },
  historyItemActive: {
    background: '#0a1f18',
    borderLeft: '2px solid #1D9E75',
  },
  historyTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  langBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: '#1a1a1a',
    border: '0.5px solid #2a2a2a',
    borderRadius: '20px',
    padding: '3px 10px',
    fontSize: '11px',
    color: '#888',
  },
  langDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
  },
  historyDate: {
    fontSize: '11px',
    color: '#444',
  },
  codePreview: {
    fontFamily: 'monospace',
    fontSize: '11px',
    color: '#555',
    lineHeight: '1.6',
    margin: 0,
    whiteSpace: 'pre-wrap',
  },
  emptyState: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '40px',
  },
  emptyTitle: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#444',
  },
  emptyDesc: {
    fontSize: '12px',
    color: '#333',
    textAlign: 'center',
  },
  emptyBtn: {
    marginTop: '8px',
    background: '#0F6E56',
    color: '#E1F5EE',
    padding: '8px 20px',
    borderRadius: '8px',
    fontSize: '13px',
    textDecoration: 'none',
  },
  detailBox: {
    flex: 1,
    overflow: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  detailSection: {},
  detailLabel: {
    fontSize: '11px',
    color: '#555',
    letterSpacing: '1px',
    fontWeight: '500',
    marginBottom: '10px',
  },
  detailCode: {
    fontFamily: 'monospace',
    fontSize: '12px',
    color: '#1D9E75',
    background: '#0d0d0d',
    border: '0.5px solid #2a2a2a',
    borderRadius: '8px',
    padding: '16px',
    lineHeight: '1.8',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    margin: 0,
  },
  detailResult: {
    fontFamily: 'monospace',
    fontSize: '12px',
    color: '#aaa',
    background: '#0d0d0d',
    border: '0.5px solid #2a2a2a',
    borderRadius: '8px',
    padding: '16px',
    lineHeight: '1.8',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    margin: 0,
  },
}

export default Dashboard