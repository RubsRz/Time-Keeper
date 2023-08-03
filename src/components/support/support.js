import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {url} from '../../config'

const Support = () => {

  return (

  <div class="container mt-3 mb-5">
  <h2 class="text-center my-4">Asistencia Técnica</h2>
  <p class="text-center">
    En caso de solicitar más información y/o asistencia técnica comuníquese al área de desarrollo de software 
  </p>
  <p className='text-center mb-4'>al teléfono 4493021015 ext. 101 o al correo electrónico software@timekeeper.com.</p>
  <div class="row justify-content-center mb-5">
    <div class="col-md-6">
      <form>
        <div class="form-group">
          <label for="name">Nombre:</label>
          <input type="text" class="form-control" id="name" required/>
        </div>
        <div class="form-group">
          <label for="email">Correo electrónico:</label>
          <input type="email" class="form-control" id="email" required/>
        </div>
        <div class="form-group">
          <label for="message">Mensaje:</label>
          <textarea class="form-control" id="message" rows="4" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary w-100">Enviar</button>
      </form>
    </div>
  </div>
</div>

  );
};

export default Support;