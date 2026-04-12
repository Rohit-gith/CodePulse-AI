const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

// ✅ SIGNUP
const signup = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Sab fields bharo!'
    })
  }

  try {
    // Email check karo
    const existingUser = await User.findByEmail(email)
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'Email pehle se registered hai!'
      })
    }

    // Password encrypt karo
    const hashedPassword = await bcrypt.hash(password, 10)

    // User banao
    const user = await User.create(name, email, hashedPassword)

    // Token banao
    const token = generateToken(user.id)

    res.status(201).json({
      status: 'success',
      message: 'Account ban gaya!',
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      }
    })

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
}

// ✅ LOGIN
const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Email aur password dono bharo!'
    })
  }

  try {
    // User dhundo
    const user = await User.findByEmail(email)
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Email ya password galat hai!'
      })
    }

    // Password check karo
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Email ya password galat hai!'
      })
    }

    // Token banao
    const token = generateToken(user.id)

    res.status(200).json({
      status: 'success',
      message: 'Login ho gaya!',
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      }
    })

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
}

// ✅ GET PROFILE
const getProfile = async (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { user: req.user }
  })
}

module.exports = { signup, login, getProfile }