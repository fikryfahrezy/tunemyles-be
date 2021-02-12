// /* jshint indent: 2 */
// "use strict";

// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../db");
// const ErrorResponse = require("../utils/ErrorResponse");
// const UserBankAccount = require("./UserBankAccount");
// const UserWallet = require("./UserWallet");

// const UserWalletWithdraw = sequelize.define(
//   "u_user_wallet_withdraw",
//   {
//     id: {
//       autoIncrement: true,
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       primaryKey: true,
//     },
//     id_u_user_wallet: {
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       references: {
//         model: {
//           tableName: "u_user_wallet",
//         },
//         key: "id",
//       },
//     },
//     id_u_user_bank_account: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       allowNull: false,
//       references: {
//         model: {
//           tableName: "u_user_bank_account",
//         },
//         key: "id",
//       },
//     },
//     balance_request: {
//       type: DataTypes.BIGINT,
//       allowNull: true,
//       defaultValue: 0,
//       validate: {
//         isNumeric: {
//           msg: "please input proper balance request",
//         },
//       },
//     },
//     status: {
//       type: DataTypes.INTEGER(4),
//       allowNull: true,
//       defaultValue: 1,
//       validate: {
//         isNumeric: {
//           msg: "please input proper status",
//         },
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
//     tableName: "u_user_wallet_withdraw",
//     underscored: true,
//     validate: {
//       statusMinMax() {
//         if (this.status < 0 || this.status > 2) {
//           throw new ErrorResponse("please input proper status", 400);
//         }
//       },
//     },
//   }
// );

// UserBankAccount.hasMany(UserWalletWithdraw, {
//   foreignKey: "id_u_user_bank_account",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });

// UserWalletWithdraw.UserBankAccount = UserWalletWithdraw.belongsTo(
//   UserBankAccount,
//   {
//     as: "UserBank",
//     foreignKey: "id_u_user_bank_account",
//   }
// );

// UserWallet.hasMany(UserWalletWithdraw, {
//   as: "Withdraws",
//   foreignKey: "id_u_user_wallet",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });

// UserWalletWithdraw.UuserWalet = UserWalletWithdraw.belongsTo(UserWallet, {
//   as: "UserWallet",
//   foreignKey: "id_u_user_wallet",
// });

// module.exports = UserWalletWithdraw;
