// /* jshint indent: 2 */
// "use strict";

// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../db");
// const Media = require("./Media");
// const UserUtility = require("./UserUtility");

// const Merchant = sequelize.define(
//   "u_user_is_merchant",
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
//     no_identity: {
//       type: DataTypes.STRING(16),
//       allowNull: false,
//       unique: true,
//     },
//     id_identity_photo: {
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       references: {
//         model: {
//           tableName: "m_medias",
//         },
//         key: "id",
//       },
//     },
//     id_market_photo: {
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       references: {
//         model: {
//           tableName: "m_medias",
//         },
//         key: "id",
//       },
//     },
//     market_name: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//     market_address: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     market_lat: {
//       type: DataTypes.DOUBLE,
//       allowNull: true,
//       defaultValue: 0,
//     },
//     market_lon: {
//       type: DataTypes.DOUBLE,
//       allowNull: true,
//       defaultValue: 0,
//     },
//     market_close_time: {
//       type: DataTypes.STRING(20),
//       allowNull: false,
//       validate: {
//         notEmpty: {
//           msg: "please input proper time",
//         },
//         notNull: {
//           msg: "please input proper time",
//         },
//       },
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
//     tableName: "u_user_is_merchant",
//     underscored: true,
//   }
// );

// // https://stackoverflow.com/questions/43523203/two-foreign-key-of-same-table-in-one-table-in-sequelize
// Media.hasOne(Merchant, {
//   foreignKey: "id_identity_photo",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });

// Merchant.IdentityPhoto = Merchant.belongsTo(Media, {
//   as: "IdentityPhoto",
//   foreignKey: "id_identity_photo",
// });

// Media.hasOne(Merchant, {
//   foreignKey: "id_market_photo",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });

// Merchant.MarketPhoto = Merchant.belongsTo(Media, {
//   as: "MarketPhoto",
//   foreignKey: "id_market_photo",
// });

// UserUtility.hasOne(Merchant, {
//   foreignKey: "id_u_user",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });

// Merchant.UserUtility = Merchant.belongsTo(UserUtility, {
//   as: "User",
//   foreignKey: "id_u_user",
// });

// module.exports = Merchant;
