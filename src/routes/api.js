const express = require('express');
const router = express.Router();
const { validateWord } = require('../controllers/wordsController');

router.get('/validate', validateWord);

module.exports = router;