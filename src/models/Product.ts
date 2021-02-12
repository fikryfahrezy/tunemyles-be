// /* jshint indent: 2 */
// "use strict";

// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../db");
// const Media = require("./Media");
// const Muser = require("./Muser");
// const ProductUtility = require("./ProductUtility");
// const ErrorResponse = require("../utils/ErrorResponse");

// const Product = sequelize.define(
//   "m_products",
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
//     product_name: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//       validate: {
//         customValidator(value) {
//           if (value === "")
//             throw new ErrorResponse("product name can't be empty", 400);
//         },
//         len: {
//           args: [2, 255],
//           msg: "please input proper product name",
//         },
//       },
//     },
//     description: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//       validate: {
//         customValidator(value) {
//           if (value === "")
//             throw new ErrorResponse("product description can't be empty", 400);
//         },
//         len: {
//           args: [2, 1000],
//           msg: "please input proper description",
//         },
//       },
//     },
//     id_cover: {
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: true,
//       defaultValue: 1,
//       references: {
//         model: {
//           tableName: "m_medias",
//         },
//         key: "id",
//       },
//     },
//     is_visible: {
//       type: DataTypes.INTEGER(1),
//       allowNull: true,
//       defaultValue: 1,
//       validate: {
//         min: 0,
//         max: 3,
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
//     tableName: "m_products",
//     underscored: true,
//     validate: {
//       visibility() {
//         if (this.is_visible < 0 || this.is_visible > 3) {
//           throw new ErrorResponse("please input proper visibility", 400);
//         }
//       },
//     },
//   }
// );

// Product.ProductUtility = Product.hasOne(ProductUtility, {
//   as: "Utility",
//   foreignKey: "id_m_products",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",

// ProductUtility.belongsTo(Product, {
//   foreignKey: "id_m_products",
// });

// Muser.hasMany(Product, {
//   foreignKey: "id_m_users",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });

// Product.Muser = Product.belongsTo(Muser, {
//   foreignKey: "id_m_users",
// });

// Media.hasOne(Product, {
//   foreignKey: "id_cover",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });

// Product.Media = Product.belongsTo(Media, {
//   as: "Cover",
//   foreignKey: "id_cover",
// });

// module.exports = Product;
