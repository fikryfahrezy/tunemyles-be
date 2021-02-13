// /* jshint indent: 2 */
// "use strict";

// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../db");
// const Media = require("./Media");

// const ProductPhoto = sequelize.define(
//   "u_product_photos",
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
//     id_m_medias: {
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       references: {
//         model: {
//           tableName: "m_medias",
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
//     tableName: "u_product_photos",
//     underscored: true,
//   }
// );

// ProductPhoto.Media = Media.hasMany(ProductPhoto, {
//   foreignKey: "id_m_medias",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });

// ProductPhoto.belongsTo(Media, {
//   as: "Media",
//   foreignKey: "id_m_medias",
// });

// module.exports = ProductPhoto;
