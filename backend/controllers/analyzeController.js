const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const analyzeCode = async (req, res) => {

  const { code, language } = req.body;

  if (!code) {
    return res.status(400).json({
      status: 'error',
      message: 'Code nahi mila! Kuch toh bhejo 😅'
    });
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
    });

    res.status(200).json({
      status: 'success',
      data: {
        language: language,
        analysis: response.choices[0].message.content
      }
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }

};

module.exports = { analyzeCode };