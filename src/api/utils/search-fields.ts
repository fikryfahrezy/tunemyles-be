// "use strict";

// const { Op } = require("sequelize");

// exports.searchFields = (fields, search) => {
//   let query = " ";
//   for (let index = 0; index < fields.length; index++) {
//     const field = fields[index];
//     if (index === fields.length - 1) query += ` ${field} LIKE "%${search}%" `;
//     else query += ` ${field} LIKE "%${search}%" OR `;
//   }
//   return query;
// };

// /**
//  *
//  * @param {string} search
//  * @param {any[]} availableFields
//  */
// exports.searchBuilder = (search, availableFields) => {
//   const or = [];
//   for (const value of availableFields) {
//     or.push({ [value]: { [Op.substring]: search } });
//   }

//   return or;
// };
