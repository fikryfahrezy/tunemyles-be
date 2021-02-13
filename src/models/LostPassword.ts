// /* jshint indent: 2 */
// "use strict";

// const { DataTypes } = require("sequelize");
// const md5 = require("md5");
// const jwt = require("jsonwebtoken");
// const { sequelize } = require("../db");
// const ErrorResponse = require("../utils/ErrorResponse");
// const UserUtility = require("./UserUtility");

// const LostPassword = sequelize.define(
//   "u_user_lost_password",
//   {
//     id: {
//       autoIncrement: true,
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       primaryKey: true,
//     },
//     id_u_user: {
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       references: {
//         model: {
//           tableName: "u_user",
//         },
//         key: "id",
//       },
//     },
//     verification_token: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//       set(value) {
//         const token = jwt.sign(
//           { token: md5(`${Date.now()}${value}`) },
//           process.env.JWT_TEMP_TOKEN,
//           {
//             expiresIn: process.env.JWT_TEMP_TOKEN_EXP,
//           }
//         );
//         this.setDataValue("verification_token", token);
//       },
//     },
//     status: {
//       type: DataTypes.INTEGER(1),
//       allowNull: true,
//       defaultValue: 0,
//       validate: {
//         min: 0,
//         max: 2,
//       },
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
//     tableName: "u_user_lost_password",
//     underscored: true,
//     validate: {
//       somethingWrong() {
//         if (this.status < 0 || this.status > 2) {
//           throw new ErrorResponse("please input proper status", 400);
//         }
//       },
//     },
//   }
// );

// UserUtility.hasMany(LostPassword, {
//   foreignKey: "id_u_user",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });

// LostPassword.UserUtility = LostPassword.belongsTo(UserUtility, {
//   as: "User",
//   foreignKey: "id_u_user",
// });

// module.exports = LostPassword;
