import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Footer from './components/Footer'
import Analyzer from './pages/Analyzer'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import './App.css'

function Home() {
  const { colors } = useTheme()

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: colors.bg,
      overflow: 'hidden',
    }}>

      {/* Sticky Navbar */}
      <div style={{ flexShrink: 0 }}>
        <Navbar />
      </div>

      {/* Scrollable Content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        background: colors.bg,
      }}>
        <Hero />
        <Features />
      </div>

      {/* Sticky Footer */}
      <div style={{ flexShrink: 0 }}>
        <Footer />
      </div>

    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyzer" element={<Analyzer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App