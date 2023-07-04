import React from "react";

// Componente de pie de página
function Footer() {
  return (
    // Div contenedor del pie de página
    <footer className="footer bg-light text-center">
      <div className="container">
        <div className="row">
          <div className="col">
            {/* Título de la sección de contacto */}
            <h3>Contacto</h3>
            {/* Información de contacto */}
            <p>Información de contacto aquí</p>
          </div>
          <div className="col">
            {/* Título de la sección de mapa del sitio */}
            <h3>Site Map</h3>
            <ul>
              {/* Elementos de la lista del mapa del sitio */}
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        {/* Texto de derechos de autor */}
        <span className="text-muted">© 2023 Time Keeper. Todos los derechos reservados.</span>
      </div>
    </footer>
  );
}

// Exportar el componente Footer
export default Footer;
