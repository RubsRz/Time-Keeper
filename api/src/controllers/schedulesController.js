const mysql = require ("mysql2/promise");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../utils/database");

const getSchedules = async(req, res)=>{
    try {
        const schedules = await pool.query(
            `SELECT e.name, e.lastname, u.email, s.startdate, s.enddate, s.starttime, s.endtime,s.idschedule
            FROM schedules s
            LEFT JOIN sched_emp se on s.idschedule = se.idschedule
            LEFT JOIN employees e ON se.id_employee = e.idemployee
            LEFT JOIN users U ON U.iduser =  e.iduser;`);
            //console.log(schedules[0])
            res.status(200).json(schedules[0]);
            
    } catch (error) {
        res.status(500).json({message:"Error al obtener los usuarios"+ error});
    }
};
const updateSchedules = async(req,res)=>{
    try {
        const {idschedule,starttime,endtime}=req.body;
        const query ='UPDATE schedules SET starttime =?, endtime=? where idschedule=?';
        const values = [starttime,endtime,idschedule];
        //console.log(idschedule,' ',starttime,' ',endtime);
        //console.log(req.body)
        const response = await pool.query(query,values);
        res.status(200).json({success:true, message:'Horario actualizado con éxito'});
    } catch (error) {
        console.log(error,'No se pudo actualizar el horario')
    }
};

module.exports={getSchedules,updateSchedules};