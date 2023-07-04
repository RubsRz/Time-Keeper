import React, { useState } from 'react';
import axios from 'axios';
import styles from './register.module.css';
import { url } from '../../config';

function Register({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(url+'/auth/register', { email, password });

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
        <h1>Register</h1>
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
          <button type="submit">Register</button>
        </form>
      </div>
      <div className={styles.fack}>
        <a href="/login"><i className={`fa fa-question-circle ${styles.icon}`}></i>Already have an account?</a>
      </div>
    </div>
  );
}

export default Register;









// import React from 'react';
// import styles from './register.module.css';

// function Register() {
//   return (
//     <div className={styles.panel}>
//       <div className={styles.state}>
//         <br />
//         <i className={`fa fa-user-plus ${styles.icon}`}></i>
//         <br />
//         <h1>Register</h1>
//       </div>
//       <div className={styles.form}>
//         <div className={styles.formRow}>
//           <input placeholder='User ID' type="text" />
//           <input placeholder='Full Name' type="text" />
//         </div>
//         <div className={styles.formRow}>
//           <input placeholder='Date of Birth' type="date" value='2000-01-01' />
//           <input placeholder='Email' type="text" />
//         </div>
//         <div className={styles.formRow}>
//           <input placeholder='Password' type="password" />
//           <input placeholder='Confirm Password' type="password" />
//         </div>
//         <div className={styles.register}>Register</div>
//       </div>
//       <div className={styles.fack}>
//         <a href="/login"><i className={`fa fa-question-circle ${styles.icon}`}></i>Already have an account?</a>
//       </div>
//     </div>
//   );
// }

// export default Register;
