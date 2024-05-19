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
});

sequelize.sync();

module.exports = Forms;
