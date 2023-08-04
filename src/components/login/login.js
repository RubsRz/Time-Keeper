import React, { useState } from 'react';
import axios from 'axios';
import styles from './login.module.css';
import { url } from '../../config';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetPasswordError, setResetPasswordError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(url + '/auth/login', { email, password });
      console.log(response)
      if (response.status == 200) {
        Swal.fire({
          title:'Inicio de sesión correcto',
          allowOutsideClick:false,
          icon:'success',
          showConfirmButton:false
        });
        setTimeout(()=>{
          Swal.close();
        },1000);
        const token = response.data.token;
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
      } else{
        Swal.fire({
          title:'Inicio de sesión icorrecto',
          text: 'Las credenciales no coinciden',
          allowOutsideClick:false,
          icon:'error',
          showConfirmButton:false
        });
        setTimeout(()=>{
          Swal.close();
        },1000);
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(url + '/auth/forgot-password', { email: forgotPasswordEmail });

      console.log(response.data);

      if (response.status == 201) {
        toast.error('Correo electrónico no encontrado');
      } else {
        setShowForgotPasswordModal(false);
        setResetCode('');
        setNewPassword('');
        setConfirmPassword('');
        setShowResetPasswordModal(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setResetPasswordError('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await axios.post(url + '/auth/reset-password', {
        email: forgotPasswordEmail,
        resetCode,
        newPassword,
      });

      console.log(response.data);

      if (response.status === 201) {
        setResetPasswordError('El código de restablecimiento es incorrecto.');
      } else if (response.status === 200) {
        setShowResetPasswordModal(false);
        setResetCode('');
        setNewPassword('');
        setConfirmPassword('');
        Swal.fire({
          title: 'Contraseña restablecida con éxito',
          icon: 'success',
          onClose: () => window.location.reload(),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.panel}>
      <ToastContainer /> {/* Agregar el ToastContainer en el nivel superior del componente */}
      <div className={styles.state}>
        <br />
        <i className={`fa fa-unlock-alt ${styles.icon}`}></i>
        <br />
        <h1>Log in</h1>
      </div>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.login} type="submit">
            Login
          </button>
        </form>
      </div>
      <div className={styles.fack}>
        <a href="#" onClick={() => setShowForgotPasswordModal(true)}>
          <i className={`fa fa-question-circle ${styles.icon}`}></i>Forgot password?
        </a>
      </div>
      <div className={styles.fack}>
        <a href="/register">Create new account</a>
      </div>

      {/* Modal para la opción "Forgot password" */}
      <Modal show={showForgotPasswordModal} onHide={() => setShowForgotPasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="forgotPasswordEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowForgotPasswordModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleForgotPassword}>
            Send Reset Code
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para ingresar el código de restablecimiento y cambiar la contraseña */}
      <Modal show={showResetPasswordModal} onHide={() => setShowResetPasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {resetPasswordError && <Alert variant="danger">{resetPasswordError}</Alert>}
          <Form.Group controlId="resetCode">
            <Form.Label>Reset Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter reset code"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="newPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowResetPasswordModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleResetPassword}>
            Reset Password
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Login;
