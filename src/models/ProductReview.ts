// /* jshint indent: 2 */
// "use strict";

// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../db");
// const UserProductTransaction = require("./UserProductTransaction");
// const ErrorResponse = require("../utils/ErrorResponse");

// const ProductTransactionReview = sequelize.define(
//   "u_user_transaction_product_reviews",
//   {
//     id: {
//       autoIncrement: true,
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       primaryKey: true,
//     },
//     id_u_user_transaction_products: {
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       references: {
//         model: {
//           tableName: "u_user_transaction_products",
//         },
//         key: "id",
//       },
//     },
//     rating: {
//       type: DataTypes.INTEGER(1),
//       allowNull: true,
//       defaultValue: 1,
//       validate: {
//         min: 1,
//         max: 5,
//       },
//     },
//     review: {
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
//     tableName: "u_user_transaction_product_reviews",
//     underscored: true,
//     validate: {
//       validRating() {
//         if (this.rating < 1 || this.status > 5) {
//           throw new ErrorResponse("please input proper status", 400);
//         }
//       },
//     },
//   }
// );

// UserProductTransaction.hasMany(ProductTransactionReview, {
//   as: "Reviews",
//   foreignKey: "id_u_user_transaction_products",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });

// ProductTransactionReview.UserProductTransaction = ProductTransactionReview.belongsTo(
//   UserProductTransaction,
//   {
//     foreignKey: "id_u_user_transaction_products",
//   }
// );

// module.exports = ProductTransactionReview;
