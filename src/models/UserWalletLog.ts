// /* jshint indent: 2 */
// "use strict";

// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../db");

// const UserWalletLog = sequelize.define(
//   "u_user_wallet_log",
//   {
//     id: {
//       autoIncrement: true,
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       primaryKey: true,
//     },
//     id_u_user_wallet: {
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       references: {
//         model: {
//           tableName: "u_user_wallet",
//         },
//         key: "id",
//       },
//     },
//     type: {
//       type: DataTypes.INTEGER(1),
//       allowNull: true,
//       defaultValue: 1,
//     },
//     balance: {
//       type: DataTypes.BIGINT,
//       allowNull: true,
//       defaultValue: 0,
//     },
//     status: {
//       type: DataTypes.INTEGER(4),
//       allowNull: true,
//       defaultValue: 1,
//     },
//     created_at: {
//       type: DataTypes.STRING(20),
//       allowNull: true,
//     },
//     updated_at: {
//       type: DataTypes.STRING(20),
//       allowNull: true,
//     },
//   },
//   {
//     sequelize,
//     tableName: "u_user_wallet_log",
//     underscored: true,
//   }
// );

// module.exports = UserWalletLog;
