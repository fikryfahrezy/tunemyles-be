// /* jshint indent: 2 */
// "use strict";

// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../db");
// const Wallet = require("./Wallet");

// const UserWallet = sequelize.define(
//   "u_user_wallet",
//   {
//     id: {
//       autoIncrement: true,
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       primaryKey: true,
//     },
//     id_u_user: {
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       references: {
//         model: {
//           tableName: "u_user",
//         },
//         key: "id",
//       },
//     },
//     id_m_wallets: {
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: true,
//       defaultValue: 1,
//       references: {
//         model: {
//           tableName: "m_wallets",
//         },
//         key: "id",
//       },
//     },
//     balance: {
//       type: DataTypes.BIGINT,
//       allowNull: true,
//       defaultValue: 0,
//       validate: {
//         isNumeric: {
//           msg: "Only allow numbers",
//         },
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
//     tableName: "u_user_wallet",
//     underscored: true,
//   }
// );

// Wallet.hasOne(UserWallet, {
//   foreignKey: "id_m_wallets",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });

// UserWallet.Wallet = UserWallet.belongsTo(Wallet, {
//   as: "Wallet",
//   foreignKey: "id_m_wallets",
// });

// module.exports = UserWallet;
