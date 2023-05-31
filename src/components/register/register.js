import React from 'react';
import styles from './register.module.css';

function Register() {
  return (
    <div className={styles.panel}>
      <div className={styles.state}>
        <br />
        <i className={`fa fa-user-plus ${styles.icon}`}></i>
        <br />
        <h1>Register</h1>
      </div>
      <div className={styles.form}>
        <div className={styles.formRow}>
          <input placeholder='User ID' type="text" />
          <input placeholder='Full Name' type="text" />
        </div>
        <div className={styles.formRow}>
          <input placeholder='Date of Birth' type="date" value='2000-01-01' />
          <input placeholder='Email' type="text" />
        </div>
        <div className={styles.formRow}>
          <input placeholder='Password' type="password" />
          <input placeholder='Confirm Password' type="password" />
        </div>
        <div className={styles.register}>Register</div>
      </div>
      <div className={styles.fack}>
        <a href="/login"><i className={`fa fa-question-circle ${styles.icon}`}></i>Already have an account?</a>
      </div>
    </div>
  );
}

export default Register;
