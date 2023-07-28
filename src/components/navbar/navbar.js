import React from "react";
// import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const Navbar = () => {
//   const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('token');
    // history.push('/login'); // Redirige a la página de inicio de sesión
    window.location.href = '/login'; // Redirige a la página de inicio de sesión
    
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/home">Logo</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/information">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact</a>
            </li>
          </ul>
          <button className="btn btn-danger ms-auto" onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket}/> Log Out</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
