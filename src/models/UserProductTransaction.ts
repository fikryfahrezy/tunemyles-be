// /* jshint indent: 2 */
// "use strict";

// const { DataTypes } = require("sequelize");
// const md5 = require("md5");
// const { sequelize } = require("../db");
// const UserTransaction = require("./UserTransaction");
// const ErrorResponse = require("../utils/ErrorResponse");
// const Product = require("./Product");

// const UserProductTransaction = sequelize.define(
//   "u_user_transaction_products",
//   {
//     id: {
//       autoIncrement: true,
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       primaryKey: true,
//     },
//     id_u_user_transaction: {
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       references: {
//         model: {
//           tableName: "u_user_transaction",
//         },
//         key: "id",
//       },
//     },
//     id_m_products: {
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       references: {
//         model: {
//           tableName: "m_products",
//         },
//         key: "id",
//       },
//     },
//     qty: {
//       type: DataTypes.BIGINT,
//       allowNull: true,
//       defaultValue: 0,
//       validate: {
//         isNumeric: {
//           msg: "please input proper qty",
//         },
//       },
//     },
//     transaction_token: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//       set(value) {
//         this.setDataValue("transaction_token", md5(`${value}`));
//       },
//     },
//     sub_total_price: {
//       type: DataTypes.BIGINT,
//       allowNull: true,
//       defaultValue: 0,
//       validate: {
//         isNumeric: {
//           msg: "please input proper sub total price",
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
//     tableName: "u_user_transaction_products",
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

// Product.hasMany(UserProductTransaction, {
//   foreignKey: "id_m_products",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });

// UserProductTransaction.Product = UserProductTransaction.belongsTo(Product, {
//   as: "Product",
//   foreignKey: "id_m_products",
// });

// UserTransaction.hasOne(UserProductTransaction, {
//   foreignKey: "id_u_user_transaction",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });

// UserProductTransaction.UserTransaction = UserProductTransaction.belongsTo(
//   UserTransaction,
//   {
//     as: "TransactionProduct",
//     foreignKey: "id_u_user_transaction",
//   }
// );

// module.exports = UserProductTransaction;
