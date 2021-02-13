// /* jshint indent: 2 */
// "use strict";

// const bcrypt = require("bcrypt");
// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../db");
// const ErrorResponse = require("../utils/ErrorResponse");
// const UserUtility = require("./UserUtility");
// const Media = require("./Media");

// const User = sequelize.define(
//   "m_users",
//   {
//     id: {
//       autoIncrement: true,
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       primaryKey: true,
//     },
//     full_name: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//       validate: {
//         customValidator(value) {
//           if (value === "") throw new ErrorResponse("name can't be empty", 400);
//         },
//         len: {
//           args: [2, 255],
//           msg: "input proper name",
//         },
//       },
//     },
//     username: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//       unique: true,
//       validate: {
//         is: {
//           // https://stackoverflow.com/questions/12018245/regular-expression-to-validate-username/12019115
//           args: /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/i,
//           msg: "please input proper username",
//         },
//       },
//     },
//     password: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//       set(value) {
//         const saltRounds = 10;
//         const hash = bcrypt.hashSync(value, saltRounds);
//         this.setDataValue("password", hash);
//       },
//     },
//     phone_number: {
//       type: DataTypes.STRING(20),
//       allowNull: false,
//       unique: true,
//       validate: {
//         is: {
//           // https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
//           args: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,13}$/im,
//           msg: "please input proper phone number",
//         },
//       },
//     },
//     address: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//       validate: {
//         customValidator(value) {
//           if (value === "")
//             throw new ErrorResponse("address can't be empty", 400);
//         },
//         len: {
//           args: 5,
//           msg: "input proper address",
//         },
//       },
//     },
//     id_photo: {
//       type: DataTypes.INTEGER(10).UNSIGNED,
//       allowNull: true,
//       defaultValue: 2,
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
//     tableName: "m_users",
//     underscored: true,
//   }
// );

// // https://stackoverflow.com/questions/28056211/how-to-choose-name-of-foreign-key-column-using-sequelize-and-mysql
// User.UserUtility = User.hasOne(UserUtility, {
//   as: "Utility",
//   foreignKey: "id_m_users",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });

// UserUtility.belongsTo(User, {
//   foreignKey: "id_m_users",
// });

// User.Media = User.belongsTo(Media, {
//   as: "Media",
//   foreignKey: "id_photo",
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });

// Media.hasOne(User, {
//   foreignKey: "id_photo",
// });

// module.exports = User;
