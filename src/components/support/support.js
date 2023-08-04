import React, { useState } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { url } from '../../config';
import Swal from 'sweetalert2';


const Support = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {

    event.preventDefault();
    const token = localStorage.getItem('token');
    const response = await axios.post(
      url + '/support',
      {
        name,
        email,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    Swal.fire(
      'Enviado',
      'El formulario ha sido enviado.',
      'success'
    )
      setName('')
      setEmail('')
      setMessage('')
  };

  return (
    <div className="container mt-3 mb-5">
      <h2 className="text-center my-4">Asistencia Técnica</h2>
      <p className="text-center">
        En caso de solicitar más información y/o asistencia técnica comuníquese al área de desarrollo de software 
      </p>
      <p className='text-center mb-4'>al teléfono 4493021015 ext. 101 o al correo electrónico <a href='mailto:software@timekeeper.com'>software@timekeeper.com</a>.</p>
      <div className="row justify-content-center mb-5">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Mensaje:</label>
              <textarea
                className="form-control"
                id="message"
                rows="4"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100 my-3 mb-5">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Support;
