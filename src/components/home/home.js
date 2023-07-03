import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../../config';

// Componente de página de inicio
const Home = () => {
  // Estado para almacenar la información del usuario
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Función para obtener la información del usuario desde el servidor
    const fetchUser = async () => {
      try {
        // Obtener el token de localStorage
        const token = localStorage.getItem('token');

        // Realizar una solicitud GET al endpoint '/auth/user' con el token en los encabezados
        const response = await axios.get(url + '/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Obtener el primer usuario de la respuesta del servidor
        const user = response.data.user[0][0];

        // Establecer el usuario en el estado
        setUser(user);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    // Llamar a la función fetchUser al cargar el componente
    fetchUser();
  }, []);

  return (
    <div className="container">
      {/* Verificar si el usuario existe */}
      {user && (
        <div className="d-flex justify-content-center mt-5">
          <div className="card">
            <div className="card-body text-center">
              <h1 className="card-title">Bienvenido</h1>
              {/* Mostrar el nombre y apellido del usuario */}
              <p className="card-text">
                {user.name} {user.lastname}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
