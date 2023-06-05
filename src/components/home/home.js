import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {url} from '../../config'

const Home = () => {
    const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(url+`/auth/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = response.data.user[0][0];
        setUser(user)

      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container">
      {user && (
        <div className="d-flex justify-content-center mt-5">
          <div className="card">
            <div className="card-body text-center">
              <h1 className="card-title">Bienvenido</h1>
              <p className="card-text">{user.name} {user.lastname}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;