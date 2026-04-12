import { useState } from 'react'
import { LANGUAGES } from '../config/languages'
import { getToken } from '../services/api'

function Analyzer() {
  const [code, setCode] = useState('')
  const [selectedLang, setSelectedLang] = useState('python')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const analyzeCode = async () => {
    if (!code.trim()) {
      setError('Code likho pehle!')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const token = getToken()
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ code, language: selectedLang }),
      })

      const data = await response.json()

      if (data.status === 'success') {
        setResult(data.data.analysis)
      } else {
        setError(data.message || 'Kuch gadbad ho gayi!')
      }

    } catch (err) {
      setError('Backend se connect nahi ho pa raha!')
    } finally {
      setLoading(false)
    }
  }

  const getExtension = (id) => {
    const map = {
      python: 'py', javascript: 'js',
      java: 'java', cpp: 'cpp', c: 'c'
    }
    return map[id] || 'txt'
  }

  // Result ko sections mein parse karo
  const parseResult = (text) => {
    if (!text) return []
    const sections = []

    const bugMatch = text.match(/🐞[\s\S]*?(?=✅|💡|📊|$)/)
    const qualityMatch = text.match(/✅[\s\S]*?(?=💡|📊|$)/)
    const suggestMatch = text.match(/💡[\s\S]*?(?=📊|$)/)
    const scoreMatch = text.match(/📊[\s\S]*?$/)

    if (bugMatch) sections.push({
      icon: '🐞', title: 'Bugs Found',
      content: bugMatch[0].replace(/^🐞[^\n]*\n?/, '').trim(),
      color: '#E24B4A', bg: '#1a0808'
    })
    if (qualityMatch) sections.push({
      icon: '✅', title: 'Code Quality',
      content: qualityMatch[0].replace(/^✅[^\n]*\n?/, '').trim(),
      color: '#1D9E75', bg: '#081a12'
    })
    if (suggestMatch) sections.push({
      icon: '💡', title: 'Suggestions',
      content: suggestMatch[0].replace(/^💡[^\n]*\n?/, '').trim(),
      color: '#EF9F27', bg: '#1a1208'
    })
    if (scoreMatch) sections.push({
      icon: '📊', title: 'Score',
      content: scoreMatch[0].replace(/^📊[^\n]*\n?/, '').trim(),
      color: '#378ADD', bg: '#080f1a'
    })

    return sections.length > 0 ? sections : [{
      icon: '🤖', title: 'Analysis',
      content: text,
      color: '#888', bg: '#111'
    }]
  }

  return (
    <div style={styles.page}>

      {/* Top Navbar */}
      <div style={styles.navbar}>
        <div style={styles.navLogo}>
          <div style={styles.logoBox}>
            <svg width="14" height="14" viewBox="0 0 24 24"
                 fill="none" stroke="#9FE1CB" strokeWidth="2.5">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </div>
          <span style={styles.logoText}>
            Code<span style={styles.logoAccent}>Pulse</span> AI
          </span>
        </div>
        <div style={styles.navLinks}>
          <a href="/" style={styles.navLink}>Home</a>
          <a href="/dashboard" style={styles.navLink}>Dashboard</a>
        </div>
      </div>

      {/* Page Title */}
      <div style={styles.pageTitle}>
        <div>
          <h1 style={styles.titleText}>
            Code <span style={styles.titleAccent}>Analyzer</span>
          </h1>
          <p style={styles.titleSub}>
            Paste your code below — AI will find bugs,
            score quality, and suggest improvements
          </p>
        </div>
      </div>

      {/* Language Selector */}
      <div style={styles.langBar}>
        <span style={styles.langBarLabel}>Language:</span>
        <div style={styles.langTabs}>
          {LANGUAGES.filter(l => l.active).map(lang => (
            <button
              key={lang.id}
              onClick={() => setSelectedLang(lang.id)}
              style={{
                ...styles.langTab,
                ...(selectedLang === lang.id
                  ? styles.langTabActive : {})
              }}
            >
              <div style={{
                ...styles.langDot,
                background: lang.color
              }}></div>
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div style={styles.grid}>

        {/* Left — Code Input */}
        <div style={styles.editorPanel}>

          {/* Editor Header */}
          <div style={styles.editorHeader}>
            <div style={styles.dots}>
              <div style={{...styles.dot,background:'#E24B4A'}}></div>
              <div style={{...styles.dot,background:'#EF9F27'}}></div>
              <div style={{...styles.dot,background:'#639922'}}></div>
            </div>
            <span style={styles.fileName}>
              main.{getExtension(selectedLang)}
            </span>
            <button
              onClick={() => {
                setCode('')
                setResult(null)
                setError(null)
              }}
              style={styles.clearBtn}
            >
              Clear
            </button>
          </div>

          {/* Line Numbers + Textarea */}
          <div style={styles.editorBody}>
            <div style={styles.lineNumbers}>
              {(code || ' ').split('\n').map((_, i) => (
                <div key={i} style={styles.lineNum}>
                  {i + 1}
                </div>
              ))}
            </div>
            <textarea
              style={styles.textarea}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={
                `# Paste your ${selectedLang} code here\n` +
                `# Example:\n` +
                (LANGUAGES.find(l => l.id === selectedLang)?.example || '')
              }
              spellCheck={false}
            />
          </div>

          {/* Footer */}
          <div style={styles.editorFooter}>
            <span style={styles.charCount}>
              {code.length} chars · {code.split('\n').length} lines
            </span>

            {error && (
              <div style={styles.errorMsg}>⚠ {error}</div>
            )}

            <button
              onClick={analyzeCode}
              disabled={loading}
              style={{
                ...styles.analyzeBtn,
                ...(loading ? styles.analyzeBtnLoading : {})
              }}
            >
              {loading ? (
                <span>⏳ &nbsp;Analyzing...</span>
              ) : (
                <span>▶ &nbsp;Analyze Code</span>
              )}
            </button>
          </div>

        </div>

        {/* Right — Result */}
        <div style={styles.resultPanel}>

          <div style={styles.resultHeader}>
            <span style={styles.resultHeaderTitle}>
              AI Analysis Result
            </span>
            {result && (
              <span style={styles.doneBadge}>✓ Complete</span>
            )}
          </div>

          {/* Empty State */}
          {!result && !loading && (
            <div style={styles.emptyState}>
              <div style={styles.emptyIconBox}>
                <svg width="28" height="28" viewBox="0 0 24 24"
                     fill="none" stroke="#2a2a2a" strokeWidth="1.5">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </div>
              <p style={styles.emptyTitle}>
                Ready to analyze
              </p>
              <p style={styles.emptyDesc}>
                1. Paste your code on the left
              </p>
              <p style={styles.emptyDesc}>
                2. Select your language
              </p>
              <p style={styles.emptyDesc}>
                3. Click Analyze Code
              </p>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div style={styles.emptyState}>
              <div style={styles.loadingBox}>
                <div style={styles.loadRow}>
                  <div style={styles.loadDot}></div>
                  <div style={{
                    ...styles.loadDot,
                    animationDelay: '0.15s'
                  }}></div>
                  <div style={{
                    ...styles.loadDot,
                    animationDelay: '0.3s'
                  }}></div>
                </div>
              </div>
              <p style={styles.loadingTitle}>
                AI is reviewing your code...
              </p>
              <p style={styles.loadingDesc}>
                Detecting bugs · Scoring quality · Generating suggestions
              </p>
            </div>
          )}

          {/* Result Sections */}
          {result && (
            <div style={styles.resultBody}>
              {parseResult(result).map((section, i) => (
                <div key={i} style={{
                  ...styles.section,
                  background: section.bg,
                  borderLeft: `3px solid ${section.color}`
                }}>
                  <div style={styles.sectionHeader}>
                    <span style={styles.sectionIcon}>
                      {section.icon}
                    </span>
                    <span style={{
                      ...styles.sectionTitle,
                      color: section.color
                    }}>
                      {section.title}
                    </span>
                  </div>
                  <p style={styles.sectionContent}>
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity:0.3; transform:scale(0.8); }
          50% { opacity:1; transform:scale(1); }
        }
        textarea::placeholder {
          color: #333;
          font-family: monospace;
        }
        textarea:focus {
          outline: none;
        }
      `}</style>

    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0d0d0d',
    display: 'flex',
    flexDirection: 'column',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 32px',
    borderBottom: '0.5px solid #2a2a2a',
    background: '#0d0d0d',
  },
  navLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoBox: {
    width: '28px',
    height: '28px',
    background: '#0F6E56',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#e5e5e5',
  },
  logoAccent: {
    color: '#1D9E75',
  },
  navLinks: {
    display: 'flex',
    gap: '24px',
  },
  navLink: {
    fontSize: '13px',
    color: '#666',
    textDecoration: 'none',
  },
  pageTitle: {
    padding: '28px 32px 20px',
    borderBottom: '0.5px solid #1a1a1a',
  },
  titleText: {
    fontSize: '28px',
    fontWeight: '500',
    color: '#e5e5e5',
    letterSpacing: '-0.5px',
  },
  titleAccent: {
    color: '#1D9E75',
  },
  titleSub: {
    fontSize: '14px',
    color: '#555',
    marginTop: '6px',
    lineHeight: '1.6',
  },
  langBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '14px 32px',
    borderBottom: '0.5px solid #1a1a1a',
    background: '#0d0d0d',
  },
  langBarLabel: {
    fontSize: '13px',
    color: '#555',
    fontWeight: '500',
  },
  langTabs: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  langTab: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: '#151515',
    border: '0.5px solid #2a2a2a',
    borderRadius: '8px',
    padding: '7px 14px',
    fontSize: '13px',
    color: '#666',
    cursor: 'pointer',
  },
  langTabActive: {
    background: '#0a1f18',
    border: '0.5px solid #1D9E75',
    color: '#1D9E75',
  },
  langDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    flex: 1,
    gap: '0',
    borderTop: '0.5px solid #1a1a1a',
  },
  editorPanel: {
    display: 'flex',
    flexDirection: 'column',
    borderRight: '0.5px solid #1a1a1a',
    minHeight: 'calc(100vh - 220px)',
  },
  editorHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 20px',
    background: '#111',
    borderBottom: '0.5px solid #1a1a1a',
  },
  dots: { display: 'flex', gap: '6px' },
  dot: { width: '10px', height: '10px', borderRadius: '50%' },
  fileName: {
    flex: 1,
    fontSize: '13px',
    fontFamily: 'monospace',
    color: '#444',
  },
  clearBtn: {
    background: 'none',
    border: '0.5px solid #2a2a2a',
    color: '#555',
    fontSize: '12px',
    padding: '4px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  editorBody: {
    flex: 1,
    display: 'flex',
    background: '#0d0d0d',
    overflow: 'hidden',
  },
  lineNumbers: {
    padding: '20px 0',
    minWidth: '48px',
    background: '#0a0a0a',
    borderRight: '0.5px solid #1a1a1a',
    textAlign: 'right',
  },
  lineNum: {
    fontSize: '13px',
    fontFamily: 'monospace',
    color: '#2a2a2a',
    lineHeight: '1.9',
    paddingRight: '12px',
    userSelect: 'none',
  },
  textarea: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#c8e6c9',
    fontFamily: "'Fira Code', 'Consolas', monospace",
    fontSize: '14px',
    lineHeight: '1.9',
    padding: '20px 20px',
    resize: 'none',
    caretColor: '#1D9E75',
  },
  editorFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 20px',
    background: '#111',
    borderTop: '0.5px solid #1a1a1a',
  },
  charCount: {
    fontSize: '12px',
    color: '#333',
    fontFamily: 'monospace',
    flex: 1,
  },
  errorMsg: {
    fontSize: '12px',
    color: '#E24B4A',
    background: '#1a0808',
    padding: '6px 12px',
    borderRadius: '6px',
    border: '0.5px solid #3a1515',
  },
  analyzeBtn: {
    background: '#0F6E56',
    color: '#E1F5EE',
    border: 'none',
    padding: '10px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  analyzeBtnLoading: {
    background: '#0a3d2e',
    cursor: 'not-allowed',
    color: '#1D9E75',
  },
  resultPanel: {
    display: 'flex',
    flexDirection: 'column',
    background: '#0a0a0a',
  },
  resultHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 24px',
    background: '#111',
    borderBottom: '0.5px solid #1a1a1a',
  },
  resultHeaderTitle: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#888',
    letterSpacing: '0.3px',
  },
  doneBadge: {
    fontSize: '12px',
    background: '#0a1f18',
    color: '#1D9E75',
    padding: '4px 12px',
    borderRadius: '20px',
    fontWeight: '500',
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
  emptyIconBox: {
    width: '56px',
    height: '56px',
    background: '#111',
    border: '0.5px solid #1a1a1a',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '8px',
  },
  emptyTitle: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#333',
  },
  emptyDesc: {
    fontSize: '13px',
    color: '#2a2a2a',
    textAlign: 'center',
  },
  loadingBox: {
    width: '56px',
    height: '56px',
    background: '#111',
    border: '0.5px solid #1a1a1a',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '8px',
  },
  loadRow: {
    display: 'flex',
    gap: '6px',
  },
  loadDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#1D9E75',
    animation: 'pulse 1s ease-in-out infinite',
  },
  loadingTitle: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#444',
  },
  loadingDesc: {
    fontSize: '12px',
    color: '#2a2a2a',
    textAlign: 'center',
  },
  resultBody: {
    flex: 1,
    overflow: 'auto',
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  section: {
    borderRadius: '10px',
    padding: '16px 18px',
    border: '0.5px solid #1a1a1a',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
  },
  sectionIcon: {
    fontSize: '16px',
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0.3px',
  },
  sectionContent: {
    fontSize: '13px',
    color: '#aaa',
    lineHeight: '1.8',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    margin: 0,
    paddingLeft: '26px',
  },
}

export default Analyzer