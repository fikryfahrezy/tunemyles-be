// /* jshint indent: 2 */
// "use strict";

// const { DataTypes } = require("sequelize");
// const slugify = require("slugify");
// const { sequelize } = require("../db");
// const ErrorResponse = require("../utils/ErrorResponse");
// const Media = require("./Media");

// const Category = sequelize.define(
//   "m_categories",
//   {
//     id: {
//       autoIncrement: true,
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       primaryKey: true,
//     },
//     category: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//       validate: {
//         customValidator(value) {
//           if (value === "")
//             throw new ErrorResponse("category name can't be empty", 400);
//         },
//         len: {
//           args: [2, 255],
//           msg: "input proper category name",
//         },
//       },
//     },
//     slug: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//       set() {
//         this.setDataValue(
//           "slug",
//           slugify(this.getDataValue("category"), { lower: true })
//         );
//       },
//     },
//     description: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//       validate: {
//         customValidator(value) {
//           if (value === "")
//             throw new ErrorResponse("category description can't be empty", 400);
//         },
//         len: {
//           args: [2, 1000],
//           msg: "input proper category description",
//         },
//       },
//     },
//     id_icon: {
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: true,
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
//     tableName: "m_categories",
//     underscored: true,
//     validate: {
//       visibility() {
//         if (this.is_visible < 0 || this.is_visible > 2) {
//           throw new ErrorResponse(
//             "category visibility must be between or equal 0 and 2",
//             400
//           );
//         }
//       },
//     },
//   }
// );

// Media.hasOne(Category, {
//   foreignKey: "id_icon",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });

// Category.Icon = Category.belongsTo(Media, {
//   as: "Icon",
//   foreignKey: "id_icon",
// });

// module.exports = Category;
