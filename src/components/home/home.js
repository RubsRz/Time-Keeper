import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../../config';
import { Modal,Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faTrash,faSave } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { text } from '@fortawesome/fontawesome-svg-core';

const Home = () => {
  // CONSTANTES Y HOOKS PARA MODAL Y HORARIOS
  const [user, setUser] = useState(null);
  //const [schedules_emp, setSchedules]= useState(null);
  const[modalOpen, setModalOpen]=useState(false);
  const[modalOpenD, setModalOpenD]=useState(false);
  const [modalFormData, setModalFormData] = useState({
    idschedule:'',
  });
  const [endtime,setEndTime]=useState('');
  const [starttime,setStartTime]=useState('');
  const [fetchSchedules,setFSchedule]=useState([]);
  const[selectedSchedule,setSelectedSchedule]=useState({});
  const schedules = [
    { id: 1, day: 'Lunes', time: '9:00 AM - 5:00 PM' },
    { id: 2, day: 'Martes', time: '9:00 AM - 5:00 PM' },
    { id: 3, day: 'Miércoles', time: '9:00 AM - 5:00 PM' },
    { id: 4, day: 'Jueves', time: '9:00 AM - 5:00 PM' },
    { id: 5, day: 'Viernes', time: '9:00 AM - 5:00 PM' },
    { id: 6, day: 'Sábado', time: 'Descanso' },
    { id: 7, day: 'Domingo', time: 'Descanso' }
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(url + '/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = response.data.user[0][0];
        setUser(user);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    };

    //obtiene los horarios
    const getSchedules = async ()=>{
      try {
        const response = await axios.get(url + '/schedules/schedules');
        setFSchedule(response.data);
        //console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
    getSchedules();
  }, [fetchSchedules]);

  //funcion para abrir el modal con los datos de donde se seleccionó el horario
  const openModalE=(schedule)=>{
    setSelectedSchedule(schedule);
    setModalOpen(true);
    setModalFormData({
      ...modalFormData,
      idschedule:schedule.idschedule,
    });
  }
  const openModalD=(schedule)=>{
    setSelectedSchedule(schedule);
    setModalOpenD(true);
  }
  //añade los valores que se modificaron a la varibale ModalFormData
  const handleModalInputChange = (event) => {
    const {name,value}=event.target;
    console.log(event.target.name+' '+event.target.value);
    if(name==='starttime'){
      setStartTime(value);
      console.log(starttime);
    }else if(name==='endtime'){
      setEndTime(value);
      console.log(endtime);
    }
    setModalFormData({
      ...modalFormData,
      [name]:value,
      //[event.target.name]: event.target.value,
    });
  };
  const validarHoras=(starttime,endtime)=>{
  const startTimeObj = new Date(`1970-01-01T${starttime}`);
  const endTimeObj = new Date(`1970-01-01T${endtime}`);
  const diffInMs = endTimeObj - startTimeObj;
  console.log(startTimeObj);
  console.log(endTimeObj);
  console.log(diffInMs);
  const diffInHours = diffInMs / (1000 * 60 * 60);
  if (diffInHours < 0) {
    //throw new Alert('La diferencia entre las horas debe ser mayor a 6 horas');
    return 0;
  } else if(diffInHours<6&& diffInHours>0){
    return 1;
  }else if(diffInHours>8.5){
    return 2;
  }else{
    return 3;
  }

  }
  
  // Define una función para manejar el envío del formulario del modal
  const handleModalFormSubmit = async() => {
    try {
      
      if(!modalFormData.starttime && !modalFormData.endtime){
        Swal.fire({ 
          title:'No se modificaron datos',
          icon:'warning'}
        )
      } else{
        if(!modalFormData.starttime){
          modalFormData.starttime=selectedSchedule.starttime;
        }
        if(!modalFormData.endtime){
          modalFormData.endtime=selectedSchedule.endtime;
        }
        const resHoras = validarHoras(modalFormData.starttime,modalFormData.endtime);
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

          console.log(modalFormData.idschedule);
          console.log(modalFormData.starttime);
          console.log(modalFormData.endtime)
          var idSchedule = modalFormData.idschedule;
          //FALTA AGREGAR FUNCIONALIDAD
          const response= await axios.put(url+`/schedules/updateSchedule/${idSchedule}`,modalFormData);
          console.log(response);
          Swal.fire({
            title:'Guardando cambios...',
            allowOutsideClick:false,
            didOpen:()=>{
              Swal.showLoading();
            },
          });
          setTimeout(()=>{
            Swal.close();
            Swal.fire({
              title: 'Cambios guardados exitosamente',
              icon: 'success',
            });
            setModalOpen(false);
          },2000);
          handleModalClose();
        }
      }
    } catch (error) {
      console.log(error);
    }  
  };
  const handleModalClose=()=>{
    setModalOpen(false);
    setModalFormData({
      starttime:'',
      endtime:'',
      idschedule:'',
    });
    setEndTime('');
    setStartTime('');
  };
  return (
    <>
    <div className="container">
      {user && user.is_boss === 0 && (
        <>
        <div className="jumbotron mt-5">
          <h1 className="display-4">¡Bienvenido, {user.name}!</h1>
          <p className="lead">Aquí tienes Los horarios horarios de la semana:</p>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-md-10">
            <div className="card">
              <div className="card-body">
                <table className="table table-hover text-center">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Día</th>
                      <th scope="col">Horario</th>
                      <th scope="col">Detalles</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedules.map(schedule => (
                      <tr key={schedule.id}>
                        <td>{schedule.day}</td>
                        <td>{schedule.time}</td>
                        <td>
                          <button className="btn btn-primary">Detalles</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        </>
      )
      }
      {user && user.is_boss === 1 && fetchSchedules &&(
      <>
      <div className="jumbotron mt-5">
        <h1 className="display-4">¡Bienvenido, {user.name}!</h1>
        <p className="lead">Aquí tienes los horarios asignados de la semana:</p>
      </div>
      <div className="container-fluid mb-5 pb-5">
        <div className="row justify-content-center mt-5">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <table className="table table-hover text-center">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Nombre</th>
                      <th scope="col">Correo</th>
                      <th scope="col">Hora de entrada</th>
                      <th scope="col">Hora de salida</th>
                      <th scope="col">Acciones</th>
                    </tr>
                      </thead>
                      <tbody>
                    {fetchSchedules.map(schedule=>(
                    <>
                        <tr>
                          <td>{schedule.name} {schedule.lastname}</td>
                          <td>{schedule.email}</td>
                          <td>{schedule.starttime}</td>
                          <td>{schedule.endtime}</td>
                          <td>
                          <div className="d-flex justify-content-around">
                              <button 
                              className="btn btn-primary"
                              onClick={()=>openModalE(schedule)}
                              >Editar <FontAwesomeIcon icon={faEdit}/>
                              </button>
                              <button 
                              className="btn btn-danger"
                              onClick={()=>openModalD(schedule)}
                              >Eliminar <FontAwesomeIcon icon={faTrash}/>
                              </button>
                            </div>
                          </td>
                        </tr>
                    </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    )}

    </div>
    
    <Modal show={modalOpen} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title/> <b>EDITAR</b>
      </Modal.Header>
      <Modal.Body>
      Editar horario de: <b>{selectedSchedule.name + ' '+selectedSchedule.lastname}</b>
      <form onSubmit={handleModalFormSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      <input type='hidden' name='idschedule' value={modalFormData.idschedule}/>
      <label style={{ marginBottom: '10px' }}>Hora de entrada:</label>
      <input
        type='time'
        name='starttime'
        value={starttime || selectedSchedule.starttime || ''}
        onChange={handleModalInputChange}
        style={{ marginBottom: '20px' }}
      />
      <label style={{ marginBottom: '10px' }}>Hora de salida:</label>
      <input
        type='time'
        name='endtime'
        value={endtime || selectedSchedule.endtime || ''}
        onChange={handleModalInputChange}
        style={{ marginBottom: '20px' }}
      />
    </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" type="submit" onClick={()=>handleModalFormSubmit()}>Guardar <FontAwesomeIcon icon={faSave}/></Button>
      </Modal.Footer>
    </Modal>
    
    <Modal show={modalOpenD} onHide={()=>setModalOpenD(false)}>
      <Modal.Header closeButton>
        <Modal.Title/> <b>ELIMINAR</b>
      </Modal.Header>
      <Modal.Body>
      ¿Está seguro de Eliminar el horario de <b>{selectedSchedule.name+' '+selectedSchedule.lastname}</b>?
      </Modal.Body>
      <Modal.Footer>
      <Button variant="danger" type="submit">Eliminar <FontAwesomeIcon icon={faTrash}/></Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default Home;
