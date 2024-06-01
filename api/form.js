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
    const ipResult = await axios.get(
      "https://ipgeolocation.abstractapi.com/v1/?api_key=c8bb988448b5494dae8291f18ab68446&ip_address=" +
        ip
    );
    const form = await Forms.create({
      ...req.body,
      ip,
      geolocalization: ipResult.data,
    });

    let transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465, // Use port 465 for SSL
      secure: true, // Set to true for SSL
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const sendTemplate = {
      from: "test009@arodu.dev", //correo de ejemplo
      to: "barbara.pedrique@gmail.com",
      subject: "Nuevo lead en web",
      text: `Nombre: ${req.body.name} | Apellidos: ${
        req.body.lastname
      } | Email: ${req.body.email} | Date: ${new Date()}`,
    };

    transporter.sendMail(sendTemplate, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent successfully:", info.response);
      }
    });

    res.render("success");
  } catch (error) {
    console.log(error);
    res.render("error");
  }
});

module.exports = router;
