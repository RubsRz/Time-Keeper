import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {url} from '../../config'

const Support = () => {

  return (

  <div className="container mt-3 mb-5">
  <h2 className="text-center my-4">Asistencia Técnica</h2>
  <p className="text-center">
    En caso de solicitar más información y/o asistencia técnica comuníquese al área de desarrollo de software 
  </p>
  <p className='text-center mb-4'>al teléfono 4493021015 ext. 101 o al correo electrónico <a href='mailto:software@timekeeper.com'>software@timekeeper.com</a>.</p>
  <div className="row justify-content-center mb-5">
    <div className="col-md-6">
      <form>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input type="text" className="form-control" id="name" required/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico:</label>
          <input type="email" className="form-control" id="email" required/>
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensaje:</label>
          <textarea className="form-control" id="message" rows="4" required></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-100 my-3 mb-5">Enviar</button>
      </form>
    </div>
  </div>
</div>

  );
};

export default Support;