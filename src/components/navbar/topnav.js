import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../../config';

const TopNav = ({  }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(url + '/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = response.data.user[0][0].name;
        setUser(user);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    };

    fetchUser()
  }, [])



  return (
    <div style={styles.topnav}>
      <div style={styles.logo}>Logo</div>
      <div style={styles.profileName}>{user}</div>
    </div>
  );
};

const styles = {
  topnav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '50px',
    width: '100%',
    backgroundColor: '#333',
    color: 'white',
    padding: '0 20px',
  },
  logo: {
    fontWeight: 'bold',
  },
  profileName: {
    fontStyle: 'italic',
  },
};

export default TopNav;
