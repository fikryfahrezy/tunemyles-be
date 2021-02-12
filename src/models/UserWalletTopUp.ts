// /* jshint indent: 2 */
// "use strict";

// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../db");
// const ErrorResponse = require("../utils/ErrorResponse");
// const Media = require("./Media");
// const Bank = require("./Bank");
// const UserWallet = require("./UserWallet");

// const UserWalletTopUp = sequelize.define(
//   "u_user_wallet_top_up",
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
//     id_m_banks: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       allowNull: false,
//       references: {
//         model: {
//           tableName: "m_banks",
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
//     balance_transfer: {
//       type: DataTypes.BIGINT,
//       allowNull: true,
//       defaultValue: 0,
//       validate: {
//         isNumeric: {
//           msg: "please input proper balance transfer",
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
//     proof_id: {
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: true,
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
//     tableName: "u_user_wallet_top_up",
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

// Bank.hasMany(UserWalletTopUp, {
//   foreignKey: "id_m_banks",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });

// UserWalletTopUp.Bank = UserWalletTopUp.belongsTo(Bank, {
//   as: "Bank",
//   foreignKey: "id_m_banks",
// });

// Media.hasOne(UserWalletTopUp, {
//   foreignKey: "proof_id",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });

// UserWalletTopUp.Media = UserWalletTopUp.belongsTo(Media, {
//   as: "Media",
//   foreignKey: "proof_id",
// });

// UserWallet.hasMany(UserWalletTopUp, {
//   as: "TopUps",
//   foreignKey: "id_u_user_wallet",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });

// UserWalletTopUp.UuserWalet = UserWalletTopUp.belongsTo(UserWallet, {
//   as: "UserWallet",
//   foreignKey: "id_u_user_wallet",
// });

// module.exports = UserWalletTopUp;
