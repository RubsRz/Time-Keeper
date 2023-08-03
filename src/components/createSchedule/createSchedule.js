import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {url} from '../../config'
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { set } from 'date-fns';
const CreateSchedule = () => {
 

  const [horario,setHorario]=useState({
    starttime:'',
    endtime:'',
  });
  const validarHoras=(starttime,endtime)=>{
    const startTimeObj = new Date(`1970-01-01T${starttime}`);
    const endTimeObj=new Date(`1970-01-01T${endtime}`);
    const diffInMs = endTimeObj-startTimeObj;
    const diffInHours=diffInMs/(1000*60*60);
    if(diffInHours<0){
      return 0;
    }else if(diffInHours<6&&diffInHours>0){
      return 1;
    }else if(diffInHours>8.5){
      return 2;
    }else{
      return 3;
    }
  }
  const [horariosCreados,setHorariosCreados]=useState([]);
  const handleSubmit=async(e)=>{
    try {
      e.preventDefault();
      const resHoras = validarHoras(horario.starttime,horario.endtime);
      if(resHoras===0){
        Swal.fire({
          title:'Horas incorrectas',
          text:'Las horas no corresponden, escriba las horas correctamente',
          icon:'error'
        })
      }else if(resHoras===1){
        Swal.fire({
          title:'Horario menor al permitido',
          text:'Las horas de trabajo deben ser mayores a 6 horas',
          icon:'info'
        })        
      }else if(resHoras===2){
        Swal.fire({
          title:'Horario excedido',
          text:'Las horas de trabajo no deben ser mayores a 8 horas',
          icon:'warning'
        }) 
      }else{

        const create = await axios.post(url+'/schedules/createSchedule',horario);
        Swal.fire({
          title:'Guardando horario...',
          allowOutsideClick:false,
          didOpen:()=>{
            Swal.showLoading();
          },
        });
        setTimeout(()=>{
          Swal.close();
          Swal.fire({
            title: 'Horario guardado correctamente',
            icon: 'success',
          });
          setHorario({starttime:'',endtime:''});
        },2000);
      }
    } catch (error) {
     console.log(error);
    }
    
  }
  const handleChange=(event)=>{
    const {name,value}=event.target;
    setHorario((prevHorario)=>({
      ...prevHorario,
      [name]:value,
    }));
  };
  useEffect(() => {
    const Bhorarios = async() => {try {
      const Respond = await axios.get(url+'/schedules/getSchedulesF');
      setHorariosCreados(Respond.data)
    } catch (error) {
      console.log('',error);
    }}
    Bhorarios();
  }, [horario]);
  return (
    <>
    <div className="container">
        <h1>Crear Horario</h1>
        <div className="col-md-12">
            <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <label>Selecciona la hora de entrada</label><br/>
                    <input type='time' name="starttime"value={horario.starttime} onChange={handleChange}></input><br/>
                    <label>Selecciona la hora de salida</label><br/>
                    <input type='time' name="endtime"value={horario.endtime} onChange={handleChange}></input> <br/>
                    <Button variant="success" onClick={handleSubmit}>Guardar <FontAwesomeIcon icon={faSave}/></Button>
                  </form>
                </div>
            </div>
        </div>
    </div>
    <div className="container">
      <h2>Horarios Creados</h2>
      <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            <table className="table table-hover text-center">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Horario de Entrada</th>
                  <th scope="col">Horario de Salida</th>
                </tr>
              </thead>
              <tbody>
                {
                  horariosCreados.map(horarioCreados => (
                    <tr>
                      <td>{horarioCreados.idschedule}</td>
                      <td>{horarioCreados.starttime.slice(0,5)}</td>
                      <td>{horarioCreados.endtime.slice(0,5)}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CreateSchedule;