import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {url} from '../../config'

const Layout = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(url+'/auth/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.users[0]);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Usuarios</h1>
      <ul>
        {users.map((user) => (
          <li key={user.iduser}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Layout;