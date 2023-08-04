import React from "react";

// Componente de pie de página
function Footer() {
  return (
    // Div contenedor del pie de página
    <footer className="footer bg-light text-center" style={styles.footer}>
      <div className="container">
        {/* Texto de derechos de autor */}
        <span className="text-muted">© 2023 Time Keeper. Todos los derechos reservados.</span>
      </div>
    </footer>
  );
}


const styles = {
  footer: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
};

// Exportar el componente Footer
export default Footer;
