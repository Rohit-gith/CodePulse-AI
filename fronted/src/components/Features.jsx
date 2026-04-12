const FEATURES = [
  {
    num: '01',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24"
           fill="none" stroke="#1D9E75" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
    ),
    title: 'Bug detection',
    desc: 'Syntax, logic, and runtime errors caught instantly.'
  },
  {
    num: '02',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24"
           fill="none" stroke="#1D9E75" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Quality scoring',
    desc: '0–10 score on readability and best practices.'
  },
  {
    num: '03',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24"
           fill="none" stroke="#1D9E75" strokeWidth="1.5">
        <path d="M12 20h9"/>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    title: 'AI suggestions',
    desc: 'Expert fixes to make your code production-ready.'
  },
  {
    num: '04',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24"
           fill="none" stroke="#1D9E75" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    title: 'Multi-language',
    desc: '5 languages now, more added regularly.'
  },
]

function Features() {
  return (
    <div style={styles.grid} id="features">
      {FEATURES.map(feat => (
        <div key={feat.num} style={styles.feat}>
          <div style={styles.num}>{feat.num}</div>
          <div style={styles.iconBox}>{feat.icon}</div>
          <h3 style={styles.title}>{feat.title}</h3>
          <p style={styles.desc}>{feat.desc}</p>
        </div>
      ))}
    </div>
  )
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    borderBottom: '0.5px solid #2a2a2a',
  },
  feat: {
    padding: '28px',
    borderRight: '0.5px solid #2a2a2a',
  },
  num: {
    fontSize: '11px',
    color: '#1D9E75',
    fontWeight: '500',
    letterSpacing: '1px',
    marginBottom: '10px',
  },
  iconBox: {
    width: '32px',
    height: '32px',
    background: '#1a1a1a',
    border: '0.5px solid #2a2a2a',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '12px',
  },
  title: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#e5e5e5',
    marginBottom: '6px',
  },
  desc: {
    fontSize: '12px',
    color: '#666',
    lineHeight: '1.6',
  },
}

export default Features