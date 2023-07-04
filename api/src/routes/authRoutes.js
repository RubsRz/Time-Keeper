const express = require('express');
const { register, login, getuser } = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

// Ruta para registrar un usuario
router.post('/register', register);

// Ruta para iniciar sesión
router.post('/login', login);

// Ruta para obtener información de usuario (requiere token de autenticación)
router.get('/user', verifyToken, getuser);

module.exports = router;
