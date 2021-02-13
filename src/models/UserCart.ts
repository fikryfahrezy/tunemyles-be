// /* jshint indent: 2 */
// "use strict";

// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../db");
// const ErrorResponse = require("../utils/ErrorResponse");
// const User = require("./User");
// const Product = require("./Product");

// const UserCart = sequelize.define(
//   "u_user_cart",
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
//     status: {
//       type: DataTypes.INTEGER(1),
//       allowNull: true,
//       defaultValue: 0,
//       validate: {
//         isNumeric: {
//           msg: "please input proper status",
//         },
//         min: 0,
//         max: 1,
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
//     tableName: "u_user_cart",
//     underscored: true,
//     validate: {
//       statusMinMax() {
//         if (this.status < 0 || this.status > 1) {
//           throw new ErrorResponse("please input proper status", 400);
//         }
//       },
//     },
//   }
// );

// User.hasMany(UserCart, {
//   foreignKey: "id_m_users",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });

// UserCart.Buyer = UserCart.belongsTo(User, {
//   as: "Buyer",
//   foreignKey: "id_m_users",
// });

// Product.hasMany(UserCart, {
//   foreignKey: "id_m_products",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });

// UserCart.Product = UserCart.belongsTo(Product, {
//   as: "Product",
//   foreignKey: "id_m_products",
// });

// User.hasMany(UserCart, {
//   foreignKey: "id_merchant",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });

// UserCart.User = UserCart.belongsTo(User, {
//   as: "Merchant",
//   foreignKey: "id_merchant",
// });

// module.exports = UserCart;
