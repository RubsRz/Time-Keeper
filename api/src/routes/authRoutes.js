const express = require('express');
const { register, login, getuser, forgotPassword, resetPassword,getUsersUA } = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

// Ruta para registrar un usuario
router.post('/register', register);

// Ruta para iniciar sesión
router.post('/login', login);

router.post('/forgot-password', forgotPassword)

router.post('/reset-password', resetPassword)

// Ruta para obtener información de usuario (requiere token de autenticación)
router.get('/user', verifyToken, getuser);
//ruta para obtener a los usuarios que no tienen asignado un horario
router.get('/getUsersUA',getUsersUA);

module.exports = router;
