// const fs = require("fs");
// const ErrorResponse = require("../utils/ErrorResponse");

// const fileChecker = async (ctx, next) => {
//   if (!ctx.file) throw new ErrorResponse("file required", 400);

//   await next();
// };

// const fileValidation = async (ctx, next) => {
//   if (ctx.file) {
//     if (ctx.file.size >= 5000000)
//       throw new ErrorResponse("file too large", 400);
//   }

//   await next();
// };

// const multipleFileChecker = async (ctx, next) => {
//   const objKeys = Object.keys(ctx.files);
//   if (objKeys.length === 0) {
//     throw new ErrorResponse("needed files required", 400);
//   }

//   await next();
// };

// const multipleFileValidation = async (ctx, next) => {
//   for (const key in ctx.files) {
//     if (ctx.files[key][0].size >= 5000000) {
//       fs.unlink(`${ctx.files[key][0].path}`, () => {});
//       throw new ErrorResponse("file too large", 400);
//     }
//   }

//   await next();
// };

// module.exports = {
//   fileChecker,
//   fileValidation,
//   multipleFileChecker,
//   multipleFileValidation,
// };
