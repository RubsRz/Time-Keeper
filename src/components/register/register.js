import React, { useState } from 'react';
import axios from 'axios';
import styles from './register.module.css';
import { url } from '../../config';

function Register({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [alternateEmail, setAlternateEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(url+'/auth/register', {
        email,
        password,
        fullName,
        confirmEmail,
        phoneNumber,
        alternateEmail
      });

      if (response.status === 201) {
        setIsLoggedIn(true); // Usuario registrado exitosamente, establecer isLoggedIn en true
        // Otras acciones que desees realizar después del registro exitoso
      } else {
        // Manejo de errores en caso de que el registro falle
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
        <i className={`fa fa-user-plus ${styles.icon}`}></i>
        <br />
        <h1><b>REGISTER</b></h1>
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
            type="text"
            placeholder="Confirm Email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="Alternate Email"
            value={alternateEmail}
            onChange={(e) => setAlternateEmail(e.target.value)}
          />
          <button type="submit" className={styles.register}>Register</button>
        </form>
      </div>
      <div className={styles.fack}>
        <a href="/login"><i className={`fa fa-question-circle ${styles.icon}`}></i>Already have an account?</a>
      </div>
    </div>
  );
}

export default Register;
