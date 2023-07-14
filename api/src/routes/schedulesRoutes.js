const express = require('express');
const {getSchedules} = require('../controllers/schedulesController');
const { verify } = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

//ruta para obtener datos de Schecules
router.get('/schedules',getSchedules);

module.exports = router;