const Groq = require('groq-sdk')
const Analysis = require('../models/Analysis')

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

const analyzeCode = async (req, res) => {
  const { code, language } = req.body

  if (!code) {
    return res.status(400).json({
      status: 'error',
      message: 'Code nahi mila!'
    })
  }

  try {
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'user',
          content: `
            Tum ek expert code reviewer ho.
            Neeche diya hua ${language} code analyze karo:

            1. 🐞 Bugs — koi errors hain?
            2. ✅ Code Quality — code kaisa hai?
            3. 💡 Suggestions — kya improve ho sakta hai?
            4. 📊 Score — 10 mein se kitna?

            Code:
            ${code}
          `
        }
      ],
      max_tokens: 1024
    })

    const result = response.choices[0].message.content

    // ✅ Debug — console mein dekho
    console.log('User:', req.user)
    console.log('Saving analysis...')

    // ✅ Save karo
    await Analysis.create(
      req.user.id,
      language,
      code,
      result
    )

    console.log('Analysis saved! ✅')

    res.status(200).json({
      status: 'success',
      data: {
        language,
        analysis: result
      }
    })

  } catch (error) {
    console.log('Error:', error.message)
    res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
}
// User ki history lo
const getHistory = async (req, res) => {
  try {
    const history = await Analysis.findByUserId(req.user.id)

    res.status(200).json({
      status: 'success',
      data: { history }
    })

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
}

// User ki stats lo
const getStats = async (req, res) => {
  try {
    const stats = await Analysis.getStats(req.user.id)

    res.status(200).json({
      status: 'success',
      data: { stats }
    })

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
}

module.exports = { analyzeCode, getHistory, getStats }