const express = require('express');
const { register, login, getuser } = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken')

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/user', verifyToken, getuser);

module.exports = router;
