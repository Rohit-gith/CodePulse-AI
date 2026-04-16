import { useState } from 'react'
import { LANGUAGES } from '../config/languages'

import { useTheme } from '../context/ThemeContext'

function Hero() {
  const [selectedLang, setSelectedLang] = useState('python')
  const { colors } = useTheme()

  const getExtension = (id) => {
    const map = {
      python: 'py',
      javascript: 'js',
      java: 'java',
      cpp: 'cpp',
      c: 'c'
    }
    return map[id] || 'txt'
  }

 return (
  <div style={{
    ...styles.hero,
    borderBottom: `0.5px solid ${colors.border}`,
    background: colors.bg,
  }}>

    {/* Left Side */}
    <div style={{
      ...styles.left,
      borderRight: `0.5px solid ${colors.border}`,
    }}>
      <div style={styles.kicker}>
        <div style={styles.kickerLine}></div>
        <span style={styles.kickerText}>
          AI-POWERED CODE REVIEW
        </span>
      </div>

      <h1 style={{...styles.h1, color: colors.text}}>
        Write code.<br />
        Ship <span style={styles.accent}>without</span><br />
        the bugs.
      </h1>

      <p style={{...styles.desc, color: colors.textSub}}>
        CodePulse AI reviews your code instantly — detects bugs,
        scores quality, and gives expert suggestions.
        Works with every major language.
      </p>

      <div style={styles.actions}>
        <button
          style={styles.btnMain}
          onClick={() => window.location.href = '/analyzer'}
        >
          ▶ &nbsp;Analyze my code
        </button>
        <button style={{
          ...styles.btnOutline,
          border: `0.5px solid ${colors.border}`,
          color: colors.text,
        }}>
          See demo
        </button>
      </div>

      {/* Language Section */}
      <div style={{
        ...styles.langSection,
        borderTop: `0.5px solid ${colors.border}`,
      }}>
        <div style={{
          ...styles.langLabel,
          color: colors.textMuted,
        }}>
          SUPPORTED LANGUAGES
        </div>
        <div style={styles.langGrid}>
          {LANGUAGES.filter(l => l.active).map(lang => (
            <div
              key={lang.id}
              onClick={() => setSelectedLang(lang.id)}
              style={{
                ...styles.chip,
                background: selectedLang === lang.id
                  ? colors.accentBg : colors.bg2,
                border: selectedLang === lang.id
                  ? '0.5px solid #1D9E75'
                  : `0.5px solid ${colors.border}`,
                color: selectedLang === lang.id
                  ? '#1D9E75' : colors.textSub,
              }}
            >
              <div style={{
                ...styles.chipDot,
                background: lang.color
              }}></div>
              {lang.label}
            </div>
          ))}

          {LANGUAGES.filter(l => !l.active).map(lang => (
            <div key={lang.id} style={{
              ...styles.chipDisabled,
              background: colors.bg2,
              border: `0.5px solid ${colors.border}`,
              color: colors.textMuted,
            }}>
              <div style={{
                ...styles.chipDot,
                background: lang.color
              }}></div>
              {lang.label}
            </div>
          ))}

          <div style={{
            ...styles.moreBtn,
            border: `0.5px dashed ${colors.border}`,
            color: colors.textMuted,
          }}>
            + More coming
          </div>
        </div>

        <p style={{
          ...styles.comingSoon,
          color: colors.textMuted,
        }}>
          Go, Rust, PHP — coming soon.
        </p>
      </div>
    </div>

    {/* Right Side */}
    <div style={{
      ...styles.right,
      background: colors.bg2,
    }}>
      <div style={{
        ...styles.panelTag,
        color: colors.textMuted,
      }}>
        LIVE PREVIEW
      </div>

      {/* Code Card */}
      <div style={{
        ...styles.codeCard,
        background: colors.bg,
        border: `0.5px solid ${colors.border}`,
      }}>
        <div style={{
          ...styles.codeTop,
          borderBottom: `0.5px solid ${colors.border}`,
          background: colors.bg3,
        }}>
          <div style={styles.dots}>
            <div style={{...styles.dot,background:'#E24B4A'}}></div>
            <div style={{...styles.dot,background:'#EF9F27'}}></div>
            <div style={{...styles.dot,background:'#639922'}}></div>
          </div>
          <span style={{
            ...styles.fileTag,
            color: colors.textMuted,
            background: colors.bg2,
          }}>
            main.{selectedLang === 'javascript' ? 'js'
                 : selectedLang === 'java' ? 'java'
                 : selectedLang === 'cpp' ? 'cpp'
                 : selectedLang === 'c' ? 'c' : 'py'}
          </span>
        </div>
        <pre style={{
          ...styles.codeBody,
          color: colors.codeColor,
          background: colors.codeBg,
        }}>
          {LANGUAGES.find(l => l.id === selectedLang)?.example}
        </pre>
      </div>

      {/* Result Card */}
      <div style={{
        ...styles.resultCard,
        background: colors.bg,
        border: `0.5px solid ${colors.border}`,
      }}>
        <div style={styles.resHead}>
          <span style={{
            ...styles.resTitle,
            color: colors.text,
          }}>
            Analysis result
          </span>
          <span style={styles.resBadge}>2 issues found</span>
        </div>

        <div style={styles.issue}>
          <div style={{
            ...styles.iconBox,
            background:'#FCEBEB',
            color:'#A32D2D',
          }}>!</div>
          <div>
            <div style={{
              ...styles.issueTitle,
              color: colors.text,
            }}>
              Missing argument — line 3
            </div>
            <div style={{
              ...styles.issueDesc,
              color: colors.textSub,
            }}>
              Function needs 2 args, got 1.
            </div>
          </div>
        </div>

        <div style={styles.issue}>
          <div style={{
            ...styles.iconBox,
            background:'#FAEEDA',
            color:'#854F0B',
          }}>⚠</div>
          <div>
            <div style={{
              ...styles.issueTitle,
              color: colors.text,
            }}>
              No type hints
            </div>
            <div style={{
              ...styles.issueDesc,
              color: colors.textSub,
            }}>
              Add type hints for production code.
            </div>
          </div>
        </div>

        <div style={styles.scoreRow}>
          <span style={{
            ...styles.scoreLabel,
            color: colors.textMuted,
          }}>Quality</span>
          <div style={{
            ...styles.scoreBar,
            background: colors.bg3,
          }}>
            <div style={styles.scoreFill}></div>
          </div>
          <span style={styles.scoreVal}>2 / 10</span>
        </div>
      </div>
    </div>
  </div>
)
}

const styles = {
  hero: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    borderBottom: '0.5px solid #2a2a2a',
    minHeight: '90vh',
  },
  left: {
    padding: '64px 48px 64px 40px',
    borderRight: '0.5px solid #2a2a2a',
  },
  kicker: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '24px',
  },
  kickerLine: {
    width: '18px',
    height: '1.5px',
    background: '#1D9E75',
  },
  kickerText: {
    fontSize: '11px',
    letterSpacing: '1.5px',
    color: '#1D9E75',
    fontWeight: '500',
  },
  h1: {
    fontSize: '42px',
    fontWeight: '500',
    lineHeight: '1.15',
    letterSpacing: '-1px',
    color: '#e5e5e5',
  },
  accent: {
    color: '#1D9E75',
  },
  desc: {
    fontSize: '14px',
    color: '#888',
    marginTop: '18px',
    lineHeight: '1.75',
    maxWidth: '400px',
  },
  actions: {
    display: 'flex',
    gap: '12px',
    marginTop: '32px',
  },
  btnMain: {
    background: '#0F6E56',
    color: '#E1F5EE',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: '500',
  },
  btnOutline: {
    background: 'none',
    border: '0.5px solid #333',
    color: '#e5e5e5',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  langSection: {
    marginTop: '40px',
    paddingTop: '28px',
    borderTop: '0.5px solid #2a2a2a',
  },
  langLabel: {
    fontSize: '11px',
    letterSpacing: '1px',
    color: '#555',
    fontWeight: '500',
    marginBottom: '14px',
  },
  langGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  chip: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: '#1a1a1a',
    border: '0.5px solid #2a2a2a',
    borderRadius: '20px',
    padding: '5px 12px',
    fontSize: '12px',
    color: '#ccc',
    cursor: 'pointer',
  },
  chipActive: {
    borderColor: '#1D9E75',
    background: '#0a1f18',
    color: '#1D9E75',
  },
  chipDisabled: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: '#1a1a1a',
    border: '0.5px solid #222',
    borderRadius: '20px',
    padding: '5px 12px',
    fontSize: '12px',
    color: '#444',
    opacity: '0.5',
  },
  chipDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
  },
  moreBtn: {
    background: 'none',
    border: '0.5px dashed #333',
    borderRadius: '20px',
    padding: '5px 12px',
    fontSize: '12px',
    color: '#555',
    cursor: 'pointer',
  },
  comingSoon: {
    fontSize: '11px',
    color: '#555',
    marginTop: '10px',
  },
  right: {
    padding: '40px',
    background: '#111',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    justifyContent: 'center',
  },
  panelTag: {
    fontSize: '11px',
    letterSpacing: '1px',
    color: '#555',
    fontWeight: '500',
  },
  codeCard: {
    background: '#1a1a1a',
    border: '0.5px solid #2a2a2a',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  codeTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 16px',
    borderBottom: '0.5px solid #2a2a2a',
    background: '#151515',
  },
  dots: { display: 'flex', gap: '5px' },
  dot: { width: '9px', height: '9px', borderRadius: '50%' },
  fileTag: {
    fontSize: '11px',
    fontFamily: 'monospace',
    color: '#555',
    background: '#222',
    padding: '2px 10px',
    borderRadius: '20px',
  },
  codeBody: {
    padding: '16px 20px',
    fontFamily: 'monospace',
    fontSize: '12px',
    lineHeight: '1.9',
    color: '#1D9E75',
    margin: 0,
  },
  resultCard: {
    background: '#1a1a1a',
    border: '0.5px solid #2a2a2a',
    borderRadius: '12px',
    padding: '16px 20px',
  },
  resHead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  resTitle: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#ccc',
  },
  resBadge: {
    fontSize: '11px',
    background: '#0a1f18',
    color: '#1D9E75',
    padding: '3px 10px',
    borderRadius: '20px',
    fontWeight: '500',
  },
  issue: {
    display: 'flex',
    gap: '10px',
    alignItems: 'flex-start',
    padding: '8px 0',
    borderBottom: '0.5px solid #222',
  },
  iconBox: {
    width: '22px',
    height: '22px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '500',
    flexShrink: 0,
  },
  issueTitle: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#ccc',
  },
  issueDesc: {
    fontSize: '11px',
    color: '#666',
    marginTop: '2px',
    lineHeight: '1.5',
  },
  scoreRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '12px',
    paddingTop: '10px',
    borderTop: '0.5px solid #222',
  },
  scoreLabel: { fontSize: '11px', color: '#555' },
  scoreBar: {
    flex: 1,
    height: '5px',
    background: '#222',
    borderRadius: '3px',
  },
  scoreFill: {
    width: '20%',
    height: '5px',
    borderRadius: '3px',
    background: '#1D9E75',
  },
  scoreVal: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#1D9E75',
  },
}

export default Hero