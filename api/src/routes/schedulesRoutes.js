const express = require('express');
const {getSchedules,updateSchedules} = require('../controllers/schedulesController');
const { verify } = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

//ruta para obtener datos de Schecules
router.get('/schedules',getSchedules);
//ruta para actualizar el orario;
router.put("/updateSchedule/:idSchedule",updateSchedules);
module.exports = router;