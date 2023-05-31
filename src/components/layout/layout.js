import React from "react";

function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">Logo</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container flex-grow-1">
        <h1>Contenido de la página</h1>
        <p>¡Aquí irá todo el contenido que desees!</p>
      </div>

      <footer className="footer bg-light text-center">
        <div className="container">
          <div className="row">
            <div className="col">
              <h3>Contacto</h3>
              <p>Información de contacto aquí</p>
            </div>
            <div className="col">
              <h3>Site Map</h3>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
          </div>
          <span className="text-muted">© 2023 Time Keeper. Todos los derechos reservados.</span>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
