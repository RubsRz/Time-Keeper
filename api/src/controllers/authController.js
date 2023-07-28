const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../utils/database");
const emailService = require("../utils/email");

const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario ya existe en la base de datos
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
            email,
        ]);

        if (rows.length > 0) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        // Generar un hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el nuevo usuario en la base de datos
        //TODO: Falta hacer inserts con la informacion del usuario
        await pool.query("INSERT INTO users (email, password) VALUES (?, ?)", [
            email,
            hashedPassword,
        ]);

        res.status(201).json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Buscar al usuario en la base de datos
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
            email,
        ]);
        if (rows.length === 0) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }
        // Verificar si la contraseña coincide con el hash almacenado
        const passwordMatch = await bcrypt.compare(password, rows[0].password);
        if (passwordMatch) {
            // Generar el token JWT
            const token = jwt.sign({ id: rows[0].iduser, email }, "secret-key", {
                expiresIn: "1h",
            });
            res.status(200).json({ token });
        } else {
            res.status(401).json({ message: "Credenciales inválidas" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Verificar si el usuario existe en la base de datos
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "El usuario no existe" });
        }

        // Generar un código de restablecimiento de contraseña
        const resetCode = generateResetCode();

        // Guardar el código de restablecimiento en la base de datos
        await pool.query("UPDATE users SET reset_code = ? WHERE email = ?", [resetCode, email]);

        // Enviar el código de restablecimiento por correo electrónico
        const emailData = {
            to: email,
            subject: "Restablecer contraseña",
            html: `Hola, has solicitado un restablecimiento de contraseña. Utiliza el siguiente código para cambiar tu contraseña: ${resetCode}`,
        };

        await emailService.sendEmail(emailData.to, emailData.subject, emailData.html);

        res.status(200).json({ message: "Se ha enviado un código de restablecimiento a tu correo electrónico" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

const generateResetCode = () => {
    // Generar un código de restablecimiento de contraseña aleatorio
    const resetCode = Math.random().toString(36).substr(2, 6);
    return resetCode;
};

const resetPassword = async (req, res) => {
    const { email, resetCode, newPassword } = req.body;
  
    try {
      // Verificar si el usuario existe y el código de restablecimiento es válido
      const [rows] = await pool.query("SELECT * FROM users WHERE email = ? AND reset_code = ?", [
        email,
        resetCode,
      ]);
  
      if (rows.length === 0) {
        return res.status(401).json({ message: "Invalid email or reset code" });
      }
  
      // Generar un hash de la nueva contraseña
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Actualizar la contraseña en la base de datos y borrar el código de restablecimiento
      await pool.query("UPDATE users SET password = ?, reset_code = NULL WHERE email = ?", [
        hashedPassword,
        email,
      ]);
  
      res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

const getuser = async (req, res) => {
    try {
        const user = await pool.query(
            `SELECT
        u.iduser, u.email, u.is_boss,
        IF(u.is_boss = 1, b.name, e.name) AS name,
        IF(u.is_boss = 1, b.lastname, e.lastname) AS lastname
        FROM users u
        LEFT JOIN employees e USING(iduser)
        LEFT JOIN bosses b USING(iduser)
        WHERE u.iduser = ?;`, [req.user]);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios" });
    }
};
const getUsersUA = async(req,res)=>{
    try {
        const user= await pool.query(
            `SELECT e.idemployee, e.name, e.lastname
            from employees e
            left join  users u on e.idemployee= u.iduser`
        );
        res.status(200).json(user[0]);
        //console.log("obtiene los usuarios sin asignar")
    } catch (error) {
        console.log(error)
    }
}

module.exports = { register, login, getuser, forgotPassword, resetPassword ,getUsersUA};