// /* jshint indent: 2 */
// "use strict";

// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../db");
// const Category = require("./Category");
// const ProductUtility = require("./ProductUtility");

// const ProductCategory = sequelize.define(
//   "u_product_categories",
//   {
//     id: {
//       autoIncrement: true,
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       primaryKey: true,
//     },
//     id_u_product: {
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       references: {
//         model: {
//           tableName: "u_product",
//         },
//         key: "id",
//       },
//     },
//     id_m_categories: {
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       references: {
//         model: {
//           tableName: "m_categories",
//         },
//         key: "id",
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
//     tableName: "u_product_categories",
//     underscored: true,
//   }
// );

// Category.hasMany(ProductCategory, {
//   foreignKey: "id_m_categories",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });

// ProductCategory.belongsTo(Category, {
//   as: "Category",
//   foreignKey: "id_m_categories",
// });

// ProductUtility.hasOne(ProductCategory, {
//   foreignKey: "id_u_product",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });

// ProductCategory.belongsTo(ProductUtility, {
//   as: "Product",
//   foreignKey: "id_u_product",
// });

// module.exports = ProductCategory;
