const nodemailer = require("nodemailer");

// Configuración del transporte de correo
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "alexramirez.rick200@gmail.com",
    pass: "ehppylixlknkxizw",
  },
});

// Función para enviar un correo electrónico
const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: "alexramirez.rick200@gmail.com",
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log("Correo electrónico enviado");
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
    throw new Error("Error al enviar el correo electrónico");
  }
};

module.exports = { sendEmail };
