const mysql = require ("mysql2/promise");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../utils/database");

const getSchedulesCreated = async(req,res)=>{
    try {
        const schedulesCreated = await pool.query(`SELECT * FROM schedules`);
        res.status(200).json(schedulesCreated[0]);
    } catch (error) {
        res.status(500).json({message:"Error al obtener los horarios creados "+error});
    }
}
const getSchedules = async(req, res)=>{
    try {
        const schedules = await pool.query(
            `SELECT e.name, e.lastname, u.email, se.startdate, se.enddate, s.starttime, s.endtime,s.idschedule
            FROM schedules s
            LEFT JOIN sched_emp se on s.idschedule = se.idschedule
            LEFT JOIN employees e ON se.id_employee = e.idemployee
            LEFT JOIN users U ON U.iduser =  e.iduser;`);
            //sconsole.log(schedules[0])
            res.status(200).json(schedules[0]);
            
    } catch (error) {
        res.status(500).json({message:"Error al obtener la relación de horarios y horarios"+ error});
    }
};
const getSchedulesUA=async(req,res)=>{
    try {
        const schedulesUA = await pool.query(`SELECT s.idschedule, s.starttime, s.endtime FROM schedules s LEFT JOIN sched_emp se ON s.idschedule = se.idschedule WHERE se.idschedule IS NULL`);
        res.status(200).json(schedulesUA[0]);
        //console.log("Aquí obtenemos los horarios sin asignar")
    } catch (error) {
        res.status(500).json({message:"Error al obtener los horarios"+ error})
    }
}
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
const asignSchedule = async (req,res)=>{
    try {
        const id_employee = req.body.id_employee;
        const restday=JSON.stringify(req.body.restday);
        const startdate=req.body.startdate;
        const enddate=req.body.enddate;
        console.log(startdate +' '+ enddate)
        const idschedule=req.body.idschedule;
        const query ='INSERT into sched_emp (id_employee,idschedule,startdate,enddate,restday) values(?,?,?,?,?);'
        const values=[id_employee,idschedule,startdate,enddate,restday];
        const response = await pool.query(query,values);
        res.status(200).json({success:true,message:'Asignación correcta de horario'})
    } catch (error) {
        console.log(error,'Error no se asignó correctamente');
    }
}

const deleteScheduleById=async(req,res)=>{
    try {
        const {idSchedule} =req.params;
        console.log("Eliminar producto por ID: ",idSchedule)
        const deleteSh_Emp = 'DELETE FROM sched_emp WHERE idschedule=?';
        await pool.query(deleteSh_Emp,idSchedule);

        const deleteSchedule='DELETE FROM schedules WHERE idschedule=?';
        await pool.query(deleteSchedule,idSchedule);

        res.status(200).json({message:'El Horario fue eliminado correctamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Error al eliminar el registro'});
    }
}

const createSchedule=async(req,res)=>{
    try {
        const starttime=req.body.starttime
        const endtime=req.body.endtime
        await pool.query("INSERT INTO schedules (starttime,endtime) VALUES(?,?)",[starttime,endtime]);
        res.status(200).json({message:'El horario fue creado correctamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'El horario no pudo ser creado'});
    }
}

module.exports={getSchedules,updateSchedules,deleteScheduleById,createSchedule,getSchedulesUA,asignSchedule,getSchedulesCreated};