// /* jshint indent: 2 */
// "use strict";

// const { DataTypes } = require("sequelize");
// const md5 = require("md5");
// const { sequelize } = require("../db");
// const ErrorResponse = require("../utils/ErrorResponse");
// const User = require("./User");

// const UserTransaction = sequelize.define(
//   "u_user_transaction",
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
//     id_merchant: {
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       references: {
//         model: {
//           tableName: "m_users",
//         },
//         key: "id",
//       },
//     },
//     transaction_token: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//       set(value) {
//         this.setDataValue("transaction_token", md5(`${value}`));
//       },
//     },
//     total_price: {
//       type: DataTypes.BIGINT,
//       allowNull: true,
//       defaultValue: 0,
//       validate: {
//         isNumeric: {
//           msg: "please input proper price",
//         },
//       },
//     },
//     status: {
//       type: DataTypes.INTEGER(1),
//       allowNull: true,
//       defaultValue: 0,
//       validate: {
//         isNumeric: {
//           msg: "please input proper status",
//         },
//         max: 4,
//         min: 0,
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
//     tableName: "u_user_transaction",
//     underscored: true,
//     validate: {
//       statusMinMax() {
//         if (this.status < 0 || this.status > 4) {
//           throw new ErrorResponse("please input proper status", 400);
//         }
//       },
//     },
//   }
// );

// User.hasOne(UserTransaction, {
//   foreignKey: "id_m_users",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });

// UserTransaction.Buyer = UserTransaction.belongsTo(User, {
//   as: "Buyer",
//   foreignKey: "id_m_users",
// });

// User.hasOne(UserTransaction, {
//   foreignKey: "id_merchant",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });

// UserTransaction.Merchant = UserTransaction.belongsTo(User, {
//   as: "Merchant",
//   foreignKey: "id_merchant",
// });

// module.exports = UserTransaction;
