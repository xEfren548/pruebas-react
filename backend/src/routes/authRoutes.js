const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller')

router.get('/api', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

router.post('/api/signup', authController.userSignUp)
router.post('/api/login', authController.userLogin);
router.post('/api/logout', authController.logout);
router.get('/api/isAuthenticated', authController.isAuthenticated);


module.exports = router;