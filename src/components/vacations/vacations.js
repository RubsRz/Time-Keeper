import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { url } from '../../config';

const Vacations = () => {
  const [user, setUser] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [reason, setReason] = useState('');
  const daysAllowed = 20; // Supongamos que aquí recibimos los días de vacaciones permitidos desde la base de datos.

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(url + '/vacations/vacations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data); // Asumiendo que la API devuelve el usuario actual en "data.user"
        console.log(response);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    };

    fetchUser();
  }, []);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes implementar la lógica para enviar la solicitud de vacaciones
    // a través de una API o realizar otras acciones necesarias.
    // Por ejemplo, puedes hacer una solicitud HTTP usando fetch() o Axios.
    console.log('Fecha de inicio:', startDate);
    console.log('Motivo:', reason);
  };

  return (
    <div>

      {user && user.type === 0 && user.isBetweenVacations ? (
        // empleado de vacaciones
        <div>Estás de vacaciones</div>

      ) : user && user.type === 0 && user.vacations.length > 0 ? (
        // empleado con vacaciones programadas
        <div>Tus vacaciones están programadas</div>

      ) : user && user.type === 0 && user.vacationsDays > 0 ? (
        
        <div className="container my-5 px-5 w-50">
        <h2 className="text-center">Solicitud de Vacaciones</h2>
        <p className="text-center">Tus días de vacaciones permitidos son: {daysAllowed}</p>
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
          <button type="submit" className="btn btn-primary w-100 my-3">Solicitar</button>
        </form>
      </div>


      ) : user && user.type === 1 && user.vacations.length > 0 ? (
        <div className="container my-5">
        <h2 className="text-center">Revisión de Solicitudes de Vacaciones</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Fecha de Inicio</th>
              <th>Fecha de Fin</th>
              <th>Días de Vacaciones</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Iterar sobre las solicitudes de vacaciones */}
            {user.vacations.map((vacation) => (
              <tr key={vacation.idvacation}>
                <td>{vacation.name}</td>
                <td>{vacation.lastname}</td>
                <td>{vacation.startdate}</td>
                <td>{vacation.enddate}</td>
                <td>{vacation.vacations}</td>
                <td>
                  <button className="btn btn-success mr-2">Aceptar</button>
                  <button className="btn btn-danger">Rechazar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      ) : user && user.type === 1 ? (
        <div className="container my-5">
        <h2 className="text-center">Revisión de Solicitudes de Vacaciones</h2>
        <p className="text-center">No hay solicitudes de vacaciones para revisar.</p>
      </div>
      ) : (
        // Aquí puedes manejar el caso en que "user" sea nulo o cualquier otro escenario no contemplado.
        <div>Cargando... Si ves esto es un error, cierra sesion y vuelve a iniciar sesion</div>
      )}



    </div>
  );
}

export default Vacations;
