import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { url } from '../../config';

const Vacations = () => {
  const [vacations, setVacations] = useState([]);
  const [vacationsDays, setVacationsDays] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [reason, setReason] = useState('');
  const [showModal, setShowModal] = useState(false); // Agregamos un estado para controlar si el modal está abierto o cerrado

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(url + '/vacations/vacations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVacations(response.data.vacations); // Asumiendo que la API devuelve el usuario actual en "data.user"
        setVacationsDays(response.data.vacationsDays)

      } catch (error) {
        console.error('Error al obtener las solicitudes de vacaciones:', error);
      }
    };

    fetchUser();
  }, [vacations]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleSubmit = async (event) => {
    setShowModal(false)
    event.preventDefault();
    const token = localStorage.getItem('token');
    const response = await axios.post(
      url + '/vacations/newrequest',
      {
        startDate,
        reason,
        vacationsDays,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );


  };
  

  return (
    <div className="container">
      <h2>SOLICITUDES DE VACACIONES</h2>

      <div className='mt-5 mb-2'>
        <button className="btn btn-secondary" onClick={() => setShowModal(true)}>Solcitar Vacaciones</button>
      </div>

      <div className="col-md-12 mb-5">
        <div className="card">
          <div className="card-body">
            <table className="table table-hover text-center">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Fecha de Inicio</th>
                  <th scope="col">Fecha de Termino</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {vacations.map(vacation => (
                  <tr key={vacation.idvacation}>
                    <td>{vacation.startdate}</td>
                    <td>{vacation.enddate}</td>
                    <td>
                      {vacation.status === 0 && (
                        <button className="btn btn-warning">Pendiente</button>
                      )}
                      {vacation.status === 1 && (
                        <button className="btn btn-success">Aprobada</button>
                      )}
                      {vacation.status === 2 && (
                        <button className="btn btn-danger">Rechazada</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Agregamos el componente Modal y su contenido */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Solicitud de Vacaciones</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='w-100 d-flex flex-direction-center center'>
          <p className='center text-center align-center'>TUS DIAS DE VACACIONES: {vacationsDays} </p>
          </div>
          {/* Aquí puedes agregar el contenido del formulario */}
          {/* Por ejemplo: */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="startDate">Fecha de Inicio:</label>
              <input
                type="date"
                className="form-control"
                id="startDate"
                value={startDate}
                onChange={handleStartDateChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="reason">Motivo:</label>
              <textarea
                className="form-control"
                id="reason"
                rows="4"
                value={reason}
                onChange={handleReasonChange}
                required
              ></textarea>
            </div>
            {/* ... */}
          </form>
        </Modal.Body>
        <Modal.Footer>
          {/* Aquí puedes agregar botones para cerrar el modal o enviar el formulario */}
          <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Enviar</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Vacations;
