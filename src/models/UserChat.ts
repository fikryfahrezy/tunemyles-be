// /* jshint indent: 2 */
// "use strict";

// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../db");

// const UserChat = sequelize.define(
//   "u_user_chat",
//   {
//     id: {
//       autoIncrement: true,
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       primaryKey: true,
//     },
//     id_m_users: {
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       references: {
//         model: {
//           tableName: "m_users",
//         },
//         key: "id",
//       },
//     },
//     id_cs: {
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       references: {
//         model: {
//           tableName: "m_users",
//         },
//         key: "id",
//       },
//     },
//     chat_token: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
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
//     tableName: "u_user_chat",
//     underscored: true,
//   }
// );

// module.exports = UserChat;
