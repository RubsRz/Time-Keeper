const express = require('express');
const {getSchedules,updateSchedules,deleteScheduleById,createSchedule,getSchedulesUA,asignSchedule, getSchedulesCreated, bringSchedules} = require('../controllers/schedulesController');
const { verify } = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

//ruta para obtener datos de Schecules junto con la tabla emp
router.get('/schedules',getSchedules);
//ruta para obtener solo los horarios creados
router.get('/schedulesCreated',getSchedulesCreated);
//ruta para obtener horarios sin asignar
router.get('/schedulesUA',getSchedulesUA)
//ruta para actualizar el horario
router.put("/updateSchedule/:idSchedule",updateSchedules);
//ruta para eliminar el horario
router.delete("/deleteSchedule/:idSchedule",deleteScheduleById);
//crear horario
router.post("/createSchedule",createSchedule);
//asignar horario
router.post("/asignSchedule",asignSchedule);
router.get('/getSchedulesF',bringSchedules);
module.exports = router;
