const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 'error',
      message: 'Login karo pehle!'
    })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.userId)

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'User nahi mila!'
      })
    }

    req.user = user
    next()

  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: 'Token invalid — login karo!'
    })
  }
}

module.exports = { protect }