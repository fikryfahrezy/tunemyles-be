// /* jshint indent: 2 */
// "use strict";

// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../db");
// const ErrorResponse = require("../utils/ErrorResponse");
// const Bank = require("./Bank");
// const User = require("./User");

// const UserBankAccount = sequelize.define(
//   "u_user_bank_account",
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
//     account_number: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//       validate: {
//         customValidator(value) {
//           if (value === "")
//             throw new ErrorResponse("account number can't be empty", 400);
//         },
//         len: {
//           args: [2, 255],
//           msg: "input proper account number",
//         },
//       },
//     },
//     account_name: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//       validate: {
//         customValidator(value) {
//           if (value === "")
//             throw new ErrorResponse("account name can't be empty", 400);
//         },
//         len: {
//           args: [2, 255],
//           msg: "input proper account name",
//         },
//       },
//     },
//     is_visible: {
//       type: DataTypes.INTEGER(4),
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
//     tableName: "u_user_bank_account",
//     underscored: true,
//     validate: {
//       visibility() {
//         if (this.is_visible < 0 || this.is_visible > 2) {
//           throw new ErrorResponse(
//             "wallet visibility must be between or equal 0 and 2",
//             400
//           );
//         }
//       },
//     },
//   }
// );

// Bank.hasMany(UserBankAccount, {
//   foreignKey: "id_m_banks",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });

// UserBankAccount.Bank = UserBankAccount.belongsTo(Bank, {
//   as: "Bank",
//   foreignKey: "id_m_banks",
// });

// User.hasOne(UserBankAccount, {
//   foreignKey: "id_m_banks",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });

// UserBankAccount.User = UserBankAccount.belongsTo(User, {
//   as: "User",
//   foreignKey: "id_m_banks",
// });

// module.exports = UserBankAccount;
