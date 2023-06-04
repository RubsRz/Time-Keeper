import React, { useState } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [token, setToken] = useState('');

  // Función para registrar un nuevo usuario
  const signup = async () => {
    try {
      const response = await axios.post('http://localhost:3000/signup', {
        username: 'ejemplo',
        password: '123456'
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Función para iniciar sesión y obtener el token
  const login = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username: 'ejemplo',
        password: '123456'
      });
      setToken(response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  // Función para acceder a una ruta protegida
  const accessProtectedRoute = async () => {
    try {
      const response = await axios.get('http://localhost:3000/protected', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={signup}>Registrarse</button>
      <button onClick={login}>Iniciar sesión</button>
      <button onClick={accessProtectedRoute}>Acceder a ruta protegida</button>
    </div>
  );
};

export default MyComponent;
