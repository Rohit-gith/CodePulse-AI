const pool = require('../config/db')

const Analysis = {

  // Naya analysis save karo
  create: async (userId, language, code, result) => {
    const [res] = await pool.execute(
      `INSERT INTO analyses 
       (user_id, language, code, result) 
       VALUES (?, ?, ?, ?)`,
      [userId, language, code, result]
    )
    return { id: res.insertId, userId, language }
  },

  // User ki history lo
  findByUserId: async (userId) => {
    const [rows] = await pool.execute(
      `SELECT id, language, code, result, created_at 
       FROM analyses 
       WHERE user_id = ? 
       ORDER BY created_at DESC
       LIMIT 10`,
      [userId]
    )
    return rows
  },

  // User ki stats lo
  getStats: async (userId) => {
    const [rows] = await pool.execute(
      `SELECT 
        COUNT(*) as totalAnalyses,
        COUNT(DISTINCT language) as languagesUsed
       FROM analyses 
       WHERE user_id = ?`,
      [userId]
    )
    return rows[0]
  }

}

module.exports = Analysis