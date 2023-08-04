const express = require('express');
const { getVacations, newRequest, setUpdate } = require('../controllers/vacationsController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

//ruta para obtener a los usuarios que no tienen asignado un horario
router.get('/vacations', verifyToken, getVacations);

router.post('/newrequest', verifyToken, newRequest);

router.post('/update', verifyToken, setUpdate);

module.exports = router;
