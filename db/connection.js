const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

const sequelize = new Sequelize("sqlite::memory:");

const Forms = sequelize.define("forms", {
  id: { type: DataTypes.STRING, primaryKey: true },
  name: DataTypes.STRING,
  lastname: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  description: DataTypes.STRING,
  ip: DataTypes.STRING,
  geolocalization: DataTypes.JSON,
});

const Users = sequelize.define("users", {
  id: { type: DataTypes.STRING, primaryKey: true },
  user: DataTypes.STRING,
  password: DataTypes.STRING,
});

async function initUserRoot() {
  try {
    await Users.create({ user: "root", password: "root" });
  } catch (error) {
    console.log(error);
  }
}

sequelize.sync();
setTimeout(initUserRoot, 5000);
module.exports = { Forms, Users };
