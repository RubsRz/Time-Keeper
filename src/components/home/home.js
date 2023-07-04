import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../../config';

const Home = () => {
  const [user, setUser] = useState(null);
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

    fetchUser();
  }, []);

  return (
    <div className="container">
      {user && (
        <div className="jumbotron mt-5">
          <h1 className="display-4">¡Bienvenido, {user.name}!</h1>
          <p className="lead">Aquí tienes tus horarios de la semana:</p>
        </div>
      )}

      {user && user.is_boss === 0 && (
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
      )}

{user && user.is_boss === 1 && (
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
                  <th scope="col">Fecha de Ingreso</th>
                  <th scope="col">Asignar Horario</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Empleado 1</td>
                  <td>correo1@example.com</td>
                  <td>01/07/2023</td>
                  <td>
                    <input type="datetime-local" className="form-control" />
                  </td>
                  <td>
                    <div className="d-flex justify-content-around">
                      <button className="btn btn-primary">Editar</button>
                      <button className="btn btn-danger">Eliminar</button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Empleado 2</td>
                  <td>correo2@example.com</td>
                  <td>02/07/2023</td>
                  <td>
                    <input type="datetime-local" className="form-control" />
                  </td>
                  <td>
                    <div className="d-flex justify-content-around">
                      <button className="btn btn-primary">Editar</button>
                      <button className="btn btn-danger">Eliminar</button>
                    </div>
                  </td>
                </tr>
                {/* Agrega más filas según sea necesario */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Home;
