const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../utils/database");
const emailService = require("../utils/email");

const support = async (req, res) => {
    console.log('enviado')
    const { name, email, message } = req.body;
  
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h1 style="color: #333;">Solicitud de Soporte</h1>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Correo electrónico:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      </div>
    `;
  
    emailData = {
      to: 'alejandroperez858.ra@gmail.com',
      subject: 'SUPPORT ATENTION',
      html: emailContent,
    };
  
    await emailService.sendEmail(emailData.to, emailData.subject, emailData.html);

    return res.status(200).json();
  };
  
module.exports = { support };