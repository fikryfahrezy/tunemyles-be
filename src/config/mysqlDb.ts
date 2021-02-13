// 'use strict';

import sq from "sequelize";
import cls from "cls-hooked";
const namespace = cls.createNamespace("namespace");
// import logger from'./utils/logger'
const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

sq.Sequelize.useCLS(namespace);

const sequelize = new sq.Sequelize(DB_NAME!, DB_USERNAME!, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT)!,
  dialect: "mysql",
});

async function sequelizeConnect() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
}

module.exports = {
  sq,
  sequelize,
  sequelizeConnect,
};
