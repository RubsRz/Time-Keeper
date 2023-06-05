import React, { useState } from 'react';
import axios from 'axios';
import styles from './login.module.css';
import {url} from '../../config'

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(url+'/auth/login', { email, password });

      if (response.status === 200) {
        const token = response.data.token; // Obtén el token de la respuesta del servidor
        localStorage.setItem('token', token); // Almacena el token en localStorage

        setIsLoggedIn(true); // Inicio de sesión exitoso, establecer isLoggedIn en true
        // Otras acciones que desees realizar después del inicio de sesión exitoso
      } else {
        // Manejo de errores en caso de que el inicio de sesión falle
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div className={styles.panel}>
      <div className={styles.state}>
        <br />
        <i className={`fa fa-unlock-alt ${styles.icon}`}></i>
        <br />
        <h1>Log in</h1>
      </div>
      <div className={styles.form}>
      <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.login} type="submit">Login</button>
        </form>
      </div>
      <div className={styles.fack}>
        <a href="#"><i className={`fa fa-question-circle ${styles.icon}`}></i>Forgot password?</a>
      </div>
      <div className={styles.fack}>
        <a href="/register">Create new account</a>
      </div>
    </div>
  );
}

export default Login;
