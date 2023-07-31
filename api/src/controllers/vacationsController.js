const mysql = require ("mysql2/promise");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../utils/database");
const moment = require("moment");


const getVacations = async (req, res) => {
    try {
        const type = req.user.type;

        if (type == 0) {
            var vacationsDays = 0;
            var isBetweenVacations = false;

            // Query para obtener las vacaciones actuales del empleado
            const vacations = await pool.query(`
                SELECT vacations.*
                FROM vacations
                INNER JOIN employees USING(idemployee)
                INNER JOIN users USING(iduser)
                WHERE iduser = ? AND enddate > CURDATE()`, req.user.id);

            if (vacations[0].length == 1) {
                // NO TIENE VACACIONES ASIGNADAS, OBTENER LOS DÍAS DE VACACIONES DISPONIBLES
                const availableVacations = await pool.query(`
                    SELECT vacations FROM employees
                    INNER JOIN users USING(iduser)
                    WHERE iduser = ?`, req.user.id);
                vacationsDays = availableVacations[0][0].vacations;
            } else {
                // VER SI ESTÁ DE VACACIONES HOY
                const vacationsStartDate = moment(vacations[0][0].startdate, 'YYYY-MM-DD');
                const vacationsEndDate = moment(vacations[0][0].enddate, 'YYYY-MM-DD');
                const currentDate = moment(); // No es necesario pasar new Date() aquí

                isBetweenVacations = currentDate.isBetween(vacationsStartDate, vacationsEndDate);
            }
            res.status(200).json({ type, vacations: vacations[0], vacationsDays, isBetweenVacations});
        } else {
            // QUERY PARA JEFE
            const vacations = await pool.query(`SELECT vacations.*, employees.* FROM vacations
            INNER JOIN bosses USING(idboss)
            INNER JOIN users USING(iduser)
            INNER JOIN employees USING(idemployee)
            WHERE users.iduser = ? AND status = 1`, req.user.id);
            
            console.log(vacations[0])
        
            res.status(200).json({ type, vacations: vacations[0]});
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios" + error });
    }
}


module.exports={getVacations};