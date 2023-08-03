const express = require('express');
const {getSchedules,updateSchedules,deleteScheduleById,createSchedule,getSchedulesUA,asignSchedule, bringSchedules, getSchedulesByUser} = require('../controllers/schedulesController');
const { verify } = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

//ruta para obtener datos de Schecules junto con la tabla emp
router.get('/schedules',getSchedules);

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
// ruta para obtener todos los horarios creados
router.get('/getSchedulesF',bringSchedules);
//ruta para obtener los horarios por usuario
router.get('/getSchedulesByUser/:idUser',getSchedulesByUser)
module.exports = router;
