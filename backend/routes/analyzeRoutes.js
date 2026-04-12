const express = require('express');
const router = express.Router();

// Controller import karo
const { analyzeCode } = require('../controllers/analyzeController');

// POST route banao
// Kyun POST? → User data bhej raha hai (code)
router.post('/analyze', analyzeCode);

module.exports = router;