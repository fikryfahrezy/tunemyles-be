// 'use strict';

// const sq = require('sequelize');
// const cls = require('cls-hooked');
// const namespace = cls.createNamespace('my-very-own-namespace');
// const logger = require('./utils/logger');
// const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

// sq.Sequelize.useCLS(namespace);

// const sequelize = new sq.Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
//     host: DB_HOST,
//     port: DB_PORT,
//     dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
//     logging: (msg) => logger.debug(msg),
// });

// async function sequelizeConnect() {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.log('Unable to connect to the database:', error);
//     }
// }

// module.exports = {
//     sq,
//     sequelize,
//     sequelizeConnect,
// };
