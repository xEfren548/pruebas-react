const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller')

router.get('/api', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

router.post('/api/signup', authController.userSignUp)
router.post('/api/login', authController.userLogin)
module.exports = router;