import React from "react";

function footer() {
  return (
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
  );
}

export default footer;
