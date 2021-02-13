// /* jshint indent: 2 */
// "use strict";

// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../db");
// const ErrorResponse = require("../utils/ErrorResponse");
// const Bank = require("./Bank");

// const BankUtility = sequelize.define(
//   "u_bank",
//   {
//     id: {
//       autoIncrement: true,
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       primaryKey: true,
//     },
//     id_m_banks: {
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       references: {
//         model: {
//           tableName: "m_banks",
//         },
//         key: "id",
//       },
//     },
//     step: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//       validate: {
//         customValidator(value) {
//           if (value === "") throw new ErrorResponse("step can't be empty", 400);
//         },
//         len: {
//           args: [2, 1000],
//           msg: "input proper account step",
//         },
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
//     tableName: "u_bank",
//     underscored: true,
//   }
// );

// Bank.hasMany(BankUtility, {
//   as: "Utilities",
//   foreignKey: "id_m_banks",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });

// BankUtility.Bank = BankUtility.belongsTo(Bank, {
//   foreignKey: "id_m_banks",
// });

// module.exports = BankUtility;
