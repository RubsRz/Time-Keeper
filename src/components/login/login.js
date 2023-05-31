import React from 'react';
import styles from './login.module.css';

function Login() {
  return (
    <div className={styles.panel}>
      <div className={styles.state}>
        <br />
        <i className={`fa fa-unlock-alt ${styles.icon}`}></i>
        <br />
        <h1>Log in</h1>
      </div>
      <div className={styles.form}>
        <input placeholder='Email' type="text" />
        <input placeholder='Password' type="password" />
        <div className={styles.login}>Login</div>
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
