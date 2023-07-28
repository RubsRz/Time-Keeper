import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {url} from '../../config'
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
const CreateSchedule = () => {
 

  const [horario,setHorario]=useState({
    starttime:'',
    endtime:'',
  });
  const handleSubmit=async(e)=>{
    try {
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
    //console.log(horario);
  }, [horario]);
  return (
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
  );
};

export default CreateSchedule;