import React from "react";

const handleLogout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login'; // Redirige a la página de inicio de sesión
};

const Navbar = () => {
  return (
    <div style={styles.container}>
      <img src={'/logov1-cut.png'} alt="Logo" style={styles.logo} />
      <div>
        <a style={styles.link} onClick={handleLogout}>Logout</a>
        <a style={styles.link} href="#">Perfil</a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    shadowColor: "red",
shadowOffset: {
	width: 0,
	height: 12,
},
shadowOpacity: 1.58,
shadowRadius: 16.00,

elevation: 24,
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 20px',
  },
  logo: {
    height: '50px',
    marginRight: '10px',
  },
  link: {
    color: '#8bc34a',
    fontSize: '18px',
    fontWeight: 'bold',
    textDecoration: 'none',
    marginRight: '10px',
  },
};

export default Navbar;
