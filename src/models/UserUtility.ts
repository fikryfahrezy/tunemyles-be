// /* jshint indent: 2 */
// "use strict";

// const { DataTypes } = require("sequelize");
// const md5 = require("md5");
// const { sequelize } = require("../db");
// const UserWallet = require("./UserWallet");

// const UserUtility = sequelize.define(
//   "u_user",
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
//     api_token: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//       set(value) {
//         this.setDataValue("api_token", md5(`${Date.now()}${value}`));
//       },
//     },
//     type: {
//       type: DataTypes.INTEGER(1),
//       allowNull: true,
//       defaultValue: 0,
//       validate: {
//         min: 0,
//         max: 3,
//       },
//     },
//     type_before_banned: {
//       type: DataTypes.INTEGER(1),
//       allowNull: true,
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
//     tableName: "u_user",
//     underscored: true,
//   }
// );

// UserUtility.UserWallet = UserUtility.hasMany(UserWallet, {
//   as: "UserWallets",
//   foreignKey: "id_u_user",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });
// UserWallet.belongsTo(UserUtility, {
//   foreignKey: "id_u_user",
// });

// (async () => await UserUtility.sync())();

// module.exports = UserUtility;
