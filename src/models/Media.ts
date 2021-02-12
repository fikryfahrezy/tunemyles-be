// /* jshint indent: 2 */
// "use strict";

// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../db");

// const Media = sequelize.define(
//   "m_medias",
//   {
//     id: {
//       autoIncrement: true,
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       primaryKey: true,
//     },
//     uri: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     label: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//     is_visible: {
//       type: DataTypes.INTEGER(1),
//       allowNull: true,
//       defaultValue: 1,
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
//     tableName: "m_medias",
//     underscored: true,
//   }
// );

// module.exports = Media;
