// "use strict";

// const fs = require("fs");

// const asyncHandler = (fn) => (ctx, next) =>
//   Promise.resolve(fn(ctx, next)).catch((err) => {
//     let message = err.message,
//       status = err.status || 500;

//     if (err.message === "Validation error") {
//       message = "some data already registered";
//     } else if (message.includes("Validation error: ")) {
//       message = message.replace(/Validation error: /g, "").split(",\n");
//     } else if (message.includes("ENOENT")) {
//       status = 200;
//       message = "something wrong, but actually fine";
//     } else if (message === "Multipart: Boundary not found") {
//       message = "file required";
//     } else if (message.includes("cannot be null")) {
//       message = "please fill all field";
//     } else if (message === "jwt expired") {
//       message = "token expired, please request forgot password again";
//     } else if (message.includes("Cannot delete or update a parent row")) {
//       message = "data is used";
//     }

//     if (ctx.file) fs.unlink(ctx.file.path, () => {});
//     else if (ctx.files) {
//       Promise.resolve().then(() => {
//         for (const key in ctx.files) {
//           fs.unlink(ctx.files[key][0].path, () => {});
//         }
//       });
//     }

//     ctx.status = status;
//     ctx.body = {
//       success: false,
//       messages: message instanceof Array ? message : [message],
//       code: status,
//     };
//   });

// module.exports = asyncHandler;
