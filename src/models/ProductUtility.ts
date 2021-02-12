// /* jshint indent: 2 */
// "use strict";

// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../db");
// const ProductPhoto = require("./ProductPhoto");

// const ProductUtility = sequelize.define(
//   "u_product",
//   {
//     id: {
//       autoIncrement: true,
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       primaryKey: true,
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
//     price_default: {
//       type: DataTypes.BIGINT,
//       allowNull: true,
//       defaultValue: 0,
//     },
//     price_selling: {
//       type: DataTypes.BIGINT,
//       allowNull: true,
//       defaultValue: 0,
//     },
//     qty: {
//       type: DataTypes.BIGINT,
//       allowNull: true,
//       defaultValue: 0,
//     },
//     discount: {
//       type: DataTypes.INTEGER(3),
//       allowNull: true,
//       defaultValue: 0,
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
//     tableName: "u_product",
//     underscored: true,
//   }
// );

// ProductUtility.ProductPhoto = ProductUtility.hasMany(ProductPhoto, {
//   as: "Images",
//   foreignKey: "id_u_product",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });

// ProductPhoto.belongsTo(ProductUtility, {
//   as: "ProductUtility",
//   foreignKey: "id_u_product",
// });

// module.exports = ProductUtility;
