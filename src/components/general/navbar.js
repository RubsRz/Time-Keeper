import React from "react";

const Navbar = () => {
  return (
    <div style={styles.container}>
      <img src={process.env.PUBLIC_URL + '/logo_timekeeper.png'} alt="Logo" style={styles.logo} />
      <div>
        <a style={styles.link} href="#">Logout</a>
        <a style={styles.link} href="#">Perfil</a>
      </div>
    </div>
  );
};

const styles = {
  container: {
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
