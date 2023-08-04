const express = require('express');
const { support } = require('../controllers/supportController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

// Ruta para registrar un usuario
router.post('/', support);


module.exports = router;
