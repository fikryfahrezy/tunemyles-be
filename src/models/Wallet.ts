// /* jshint indent: 2 */
// "use strict";

// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../db");
// const ErrorResponse = require("../utils/ErrorResponse");
// const Media = require("./Media");

// const Wallet = sequelize.define(
//   "m_wallets",
//   {
//     id: {
//       autoIncrement: true,
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       primaryKey: true,
//     },
//     wallet_name: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//       validate: {
//         customValidator(value) {
//           if (value === "")
//             throw new ErrorResponse("wallet name can't be empty", 400);
//         },
//         len: {
//           args: [2, 255],
//           msg: "input proper wallet name",
//         },
//       },
//     },
//     wallet_description: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//       validate: {
//         customValidator(value) {
//           if (value === "")
//             throw new ErrorResponse("wallet description can't be empty", 400);
//         },
//         len: {
//           args: [2, 1000],
//           msg: "input proper wallet description",
//         },
//       },
//     },
//     id_logo: {
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
//     tableName: "m_wallets",
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

// Media.hasOne(Wallet, {
//   foreignKey: "id_logo",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });

// Wallet.Media = Wallet.belongsTo(Media, {
//   as: "Logo",
//   foreignKey: "id_logo",
// });

// module.exports = Wallet;
