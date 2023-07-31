import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirige a la página de inicio de sesión
  };

  return (
    <>
      <div className="sidenav" style={styles.sidenav}>
        <NavLink to="/home" style={styles.link} activeClassName="linkActive">
          <img src="/logov1-cut.png" width={"180px"} />
        </NavLink>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <NavLink to="/home" style={path === '/home' ? styles.linkActive : styles.link}>
              Employees
            </NavLink>
          </li>
          <li style={styles.listItem}>
          <NavLink to="/addSchedule" style={path === '/addSchedule' ? styles.linkActive : styles.link}>
              Schedules
            </NavLink>
          </li>
          <li style={styles.listItem}>
            <NavLink to="/vacations" style={path === '/vacations' ? styles.linkActive : styles.link}>
              Vacations
            </NavLink>
          </li>
          <li style={styles.listItem}>
          <NavLink to="/support" style={path === '/support' ? styles.linkActive : styles.link}>
              Support
            </NavLink>
          </li>
        </ul>
        <button onClick={handleLogout} style={styles.button}>
          <FontAwesomeIcon icon={faRightFromBracket} /> Log Out
        </button>
      </div>
    </>
  );
};

const styles = {
  sidenav: {
    color: '#fffff',
    textAlign: 'center',
    alignItems: 'center',
    height: '100%',
    width: '200px',
    position: 'fixed',
    zIndex: 1,
    top: 0,
    left: 0,
    backgroundColor: '#111',
    overflowX: 'hidden',
    paddingTop: '20px',
  },
  link: {
    padding: '6px 8px 6px 16px',
    textDecoration: 'none',
    fontSize: '25px',
    color: '#818181',
    display: 'block',
  },
  linkActive:{
    padding: '6px 8px 6px 16px',
    textDecoration: 'none',
    fontSize: '25px',
    display: 'block',
    color: '#ffffff'
  },
  list: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
  listItem: {
    margin: '10px 0',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '14px 20px',
    margin: '8px 0',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
  },
};

export default Navbar;
