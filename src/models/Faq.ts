// /* jshint indent: 2 */
// "use strict";

// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../db");
// const ErrorResponse = require("../utils/ErrorResponse");

// const Faq = sequelize.define(
//   "m_faq",
//   {
//     id: {
//       autoIncrement: true,
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//     },
//     question: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//       validate: {
//         customValidator(value) {
//           if (value === "")
//             throw new ErrorResponse("question text can't be empty", 400);
//         },
//         len: {
//           args: [2, 1000],
//           msg: "input proper question text",
//         },
//       },
//     },
//     answer: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//       validate: {
//         customValidator(value) {
//           if (value === "")
//             throw new ErrorResponse("answer text can't be empty", 400);
//         },
//         len: {
//           args: [2, 1000],
//           msg: "input proper answer text",
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
//     tableName: "m_faq",
//     underscored: true,
//   }
// );

// module.exports = Faq;
