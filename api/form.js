const express = require("express");
const Forms = require("../db/connection");
const axios = require("axios");
const nodemailer = require("nodemailer");
const router = express.Router();

/* GET home page. */
router.post("/", async function (req, res, next) {
  try {
    let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    ip = ip.split(",")[0];
    const ipSecret = process.env.IP_LOCALIZATOR_API_KEY;
    const ipResult = await axios.get(
      "https://ipgeolocation.abstractapi.com/v1/?api_key=" +
        ipSecret +
        "&ip_address=" +
        ip
    );
    await Forms.create({
      ...req.body,
      ip,
      geolocalization: ipResult.data,
    });
    const localizationString = `${ipResult.data.city}, ${ipResult.data.region}, ${ipResult.data.country}`;
    sendMail(req, req.body.email, localizationString);
    sendMail(req, "programacion2ais@dispostable.com", localizationString);

    res.render("success");
  } catch (error) {
    console.log(error);
    res.render("error");
  }
});

function sendMail(req, email, gerolocalization) {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465, // Use port 465 for SSL
    secure: true, // Set to true for SSL
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const sendTemplate = {
    from: "test009@arodu.dev", //correo de ejemplo
    to: email,
    subject: "Nuevo lead en web",
    html: `Nombre: ${req.body.name} | Apellidos: ${req.body.lastname} | Email: ${req.body.email} | Telefono: ${req.body.phone} | Geolocalizacion: ${gerolocalization}
     <hr> Mensaje: ${req.body.description} `,
  };

  transporter.sendMail(sendTemplate, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent successfully:", info.response);
    }
  });
}
module.exports = router;
