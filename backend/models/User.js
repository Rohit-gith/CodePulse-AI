const pool = require('../config/db')

const User = {

  // Naya user banao
 create: async (name, email, hashedPassword) => {
    const [res] = await pool.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    )
    return { id: res.insertId, name, email }
  },

  // Email se user dhundo
  findByEmail: async (email) => {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    )
    return rows[0] || null
  },

  // ID se user dhundo
  findById: async (id) => {
    const [rows] = await pool.execute(
      'SELECT id, name, email, created_at as createdAt FROM users WHERE id = ?',
      [id]
    )
    return rows[0] || null
  }

}

module.exports = User