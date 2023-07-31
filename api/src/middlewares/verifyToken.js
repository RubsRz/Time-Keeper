const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Obtén el token del encabezado de autorización
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
  }

  try {
    // Verificar y decodificar el token JWT
    const decoded = jwt.verify(token, 'secret-key');

    // Añadir el userId al objeto `req`
    req.user = decoded



    // Continuar con la siguiente función de middleware
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token de autenticación inválido' });
  }
};

module.exports = verifyToken;
