const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../utils/database');

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario ya existe en la base de datos
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length > 0) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Generar un hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar el nuevo usuario en la base de datos
    await pool.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario en la base de datos
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);


    if (rows.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verificar si la contraseña coincide con el hash almacenado
    const passwordMatch = await bcrypt.compare(password, rows[0].password);

    if (passwordMatch) {
      // Generar el token JWT
      const token = jwt.sign({ email }, 'secret-key', { expiresIn: '24h' });
      const userId = rows[0].iduser;
      res.status(200).json({ token, userId });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const getuser = async(req, res) =>{
  const userId = req.params.id
    try {
      const user = await pool.query(`SELECT
      u.iduser,
      u.email,
      u.is_boss,
      IF(u.is_boss = 1, b.name, e.name) AS name,
      IF(u.is_boss = 1, b.lastname, e.lastname) AS lastname
    FROM
      users u
    LEFT JOIN
      employees e USING(iduser)
    LEFT JOIN
      bosses b USING(iduser)
    WHERE
      u.iduser = ?;
    `, [userId])
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
}

module.exports = { register, login, getuser };
