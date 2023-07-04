import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../../config';

const Home = () => {
  const [user, setUser] = useState(null);
  const [schedules, setSchedules] = useState([]);

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
        console.error('Error al obtener los usuarios:', error);
      }
    };

    const fetchSchedules = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(url + '/schedules', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const schedules = response.data;
        setSchedules(schedules);
      } catch (error) {
        console.error('Error al obtener los horarios:', error);
      }
    };

    fetchUser();
    fetchSchedules();
  }, []);

  return (
    <div className="container">
      {user && (
        <div className="d-flex justify-content-center mt-5">
          <div className="card">
            <div className="card-body text-center">
              <h1 className="card-title">Bienvenido</h1>
              <p className="card-text">
                {user.name} {user.lastname}
              </p>
            </div>
          </div>
        </div>
      )}

      {schedules.length > 0 && (
        <div className="mt-5">
          <h2>Estos son tus horarios para esta semana:</h2>
          <ul>
            {schedules.map(schedule => (
              <li key={schedule.id}>
                <strong>Día:</strong> {schedule.day}, <strong>Hora:</strong> {schedule.time}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
