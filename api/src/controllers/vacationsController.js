const mysql = require ("mysql2/promise");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../utils/database");
const moment = require("moment");


const getVacations = async (req, res) => {
    try {
        const type = req.user.type;

        if (type == 0) {
            // Query para obtener las solicitudes de vacaciones actuales del empleado
 
            const queryDays = await pool.query(`
            SELECT * FROM employees
            INNER JOIN users USING(iduser)
            WHERE iduser = ?`, req.user.id);
            const vacationsDays = queryDays[0][0].vacations

            const vacations = await pool.query(`
            SELECT v.idvacation, v.status,
            date_format(v.startdate, "%d - %m - %Y") as startdate,
            date_format(v.enddate, "%d - %m - %Y") as enddate
                            FROM vacations v
                            INNER JOIN employees USING(idemployee)
                            INNER JOIN users USING(iduser)
                            WHERE iduser = ? AND enddate > CURDATE()`, req.user.id);

            res.status(200).json({ type, vacations: vacations[0], vacationsDays});

        } else {
            // QUERY PARA JEFE
            const vacations = await pool.query(`
            SELECT v.*, e.*,
            date_format(v.startdate, "%d - %m - %Y") as f_startdate,
            date_format(v.enddate, "%d - %m - %Y") as f_enddate
            FROM vacations v
            INNER JOIN bosses USING(idboss)
            INNER JOIN users USING(iduser)
            INNER JOIN employees e USING(idemployee)
            WHERE users.iduser = ? AND status = 0`, req.user.id);
        
            res.status(200).json({ type, vacations: vacations[0]});
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios" + error });
    }
}

const newRequest = async (req, res) =>{
    try {
        const { startDate, reason, vacationsDays, } = req.body

        const query = await pool.query(`SELECT * FROM employees 
        INNER JOIN users USING(iduser)
        WHERE iduser = ?`, req.user.id)
        const boss = query[0][0].idboss
        const employee = query[0][0].idemployee

        let endDate = moment(startDate);
        let daysAdded = 0;
        while (daysAdded < vacationsDays) {
          endDate = endDate.add(1, 'days');
          if (endDate.day() !== 0 && endDate.day() !== 6) {
            // Si el día no es sábado ni domingo, lo contamos
            daysAdded++;
          }
        }
        endDate = endDate.format('YYYY-MM-DD');

        const result = await pool.query(
            `INSERT INTO vacations (idemployee, idboss, startdate, enddate, status) 
            VALUES (?, ?, ?, ?, 0)`,
            [employee, boss, startDate, endDate]
        );

        res.status(200).json();
            
        
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios" + error });
    }
}

const setUpdate = async (req, res) =>{
    const {status, vacation} = req.body

    console.log(req.body)

    const update = await pool.query(`UPDATE vacations SET status = ? WHERE idvacation = ?;`, [status, vacation])

    res.status(200).json();
    
}


module.exports={getVacations, newRequest, setUpdate};