import React from "react";
import { useState ,useEffect} from "react";
import DateTime from "react-datetime";
import format from "date-fns/format";
import { url } from "../../config";
import axios from "axios";
import "./addSchedule.module.css"
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
const AddSchedule=()=>{
    const [diasSeleccionados, setDiasSeleccionados] = useState([]);
    const [user, setUser] = useState([]);
    const [fetchSchedules,setFSchedule]=useState([]);
    const diasDeLaSemana = [
      { id: 1, nombre: 'Lunes' },
      { id: 2, nombre: 'Martes' },
      { id: 3, nombre: 'Miércoles' },
      { id: 4, nombre: 'Jueves' },
      { id: 5, nombre: 'Viernes' },
      { id: 6, nombre: 'Sábado' },
      { id: 7, nombre: 'Domingo' }
    ];
    const [horarioDisp, setHorarioDisp]=useState([]);
    const[modalFormData,setModalFormData]=useState({
        id_employee:"",
        restday:[],
        idschedule:""
    });

    const hanldeUserChange=(event)=>{
      setModalFormData({
        ...modalFormData,
        id_employee:event.target.value,
      })
    }
    const handleScheduleChange = (event)=>{
      setModalFormData({
        ...modalFormData,
        idschedule:event.target.value,
      })
    }
    const handleModalFormSubmit=async()=>{
      try {
        console.log("Click en botón guardar:",modalFormData)
        const asign = await axios.post(url+'/schedules/asignSchedule',modalFormData);
      } catch (error) {
        
      }
    }
    useEffect(() => {
  
      //obtiene los horarios
      const getSchedulesUA = async ()=>{
        try {
          const response = await axios.get(url + '/schedules/schedulesUA');
          setFSchedule(response.data);
          //console.log(fetchSchedules);
          const horarios = response.data.map((schedule)=>({
            value:schedule.idschedule,
            label:`Horario ${schedule.idschedule}`,
            starttime:schedule.starttime,
            endtime:schedule.endtime,
          }));
          setHorarioDisp(horarios);
          
        } catch (error) {
          console.log(error);
        }
      };

      const getUsersUA = async ()=>{
        try {
          const response = await axios.get(url+'/auth/getUsersUA');
          setUser(response.data);
          //console.log(response.data)
        } catch (error) {
          
        }
      }
      setModalFormData({
        ...modalFormData,
        restday:diasSeleccionados,
      });
      getUsersUA();
      getSchedulesUA();
    }, [fetchSchedules]);

    const handleCheckboxChange = (event) => {
        const diaSeleccionado = event.target.value;
        const isChecked = event.target.checked;
    
        if (isChecked) {
            // Verificar si ya hay dos días seleccionados
            if (diasSeleccionados.length < 2) {
              setDiasSeleccionados([...diasSeleccionados, diaSeleccionado]);
            } else {
              event.preventDefault();
            }
          } else {
            setDiasSeleccionados(diasSeleccionados.filter(dia => dia !== diaSeleccionado));
          }
    };
    return(
    <div className="container">
        <h1>Asignar Horario</h1>
        <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            <div>
              <label>Selecciona al usuario</label><br/>
              <select onChange={hanldeUserChange}>
                <option>Selecciona a un Usuario...</option>
                {user.map((usuario)=>(
                  <option key={usuario.idemployee} value={usuario.idemployee}>
                    {usuario.name} {usuario.lastname}
                  </option>
                ))}
              </select>
            </div>
      <div>
      <label>Selecciona tus días de descanso *</label><br />
      {diasDeLaSemana.map(dia => (
        <div key={dia.id}>
          <input
            type="checkbox"
            name="dia"
            value={dia.nombre}
            checked={diasSeleccionados.includes(dia.nombre)}
            onChange={handleCheckboxChange}
          />
          <label>{dia.nombre}</label>
          </div>
        
      ))}
      <label>Solamente puedes tener dos días de descanso</label>
        </div>
        <div>
          <label>Escoge un horario disponible</label><br/>
          <select onChange={handleScheduleChange}>
            <option>Selecciona un horario...</option>
            {horarioDisp.map((horario)=>(
              <option key={horario.value} value={horario.value}>{horario.starttime.slice(0,5)} - {horario.endtime.slice(0,5)}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Escoge la fecha en al que el usuario contará con este horario</label>
          <input type="date" value="startdate"></input>
          <input type="date" value="enddate"></input>
        </div>
        <Button variant="success" type="submit" onClick={()=>handleModalFormSubmit()}>Guardar <FontAwesomeIcon icon={faSave}/></Button>
        </div>
    </div>
    </div>
    </div>
    );
};
export default AddSchedule;