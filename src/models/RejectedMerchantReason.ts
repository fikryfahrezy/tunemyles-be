// /* jshint indent: 2 */
// "use strict";

// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../db");

// const RejectedMerchantReason = sequelize.define(
//   "u_user_is_merchant_reject_reason",
//   {
//     id: {
//       autoIncrement: true,
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       primaryKey: true,
//     },
//     id_u_user_is_merchant: {
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       references: {
//         model: {
//           tableName: "u_user_is_merchant",
//         },
//         key: "id",
//       },
//     },
//     reason: {
//       type: DataTypes.TEXT,
//       allowNull: true,
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
//     tableName: "u_user_is_merchant_reject_reason",
//     underscored: true,
//   }
// );

// module.exports = RejectedMerchantReason;
