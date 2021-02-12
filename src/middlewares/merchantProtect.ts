// "use strict";

// const asyncHandler = require("./asyncHandler");
// const UserUtility = require("../models/UserUtility");
// const ErrorResponse = require("../utils/ErrorResponse");

// const merchantProtect = asyncHandler(async (ctx, next) => {
//   const { authorization } = ctx.header;
//   if (!authorization) throw new ErrorResponse("forbidden", 403);

//   const user = await UserUtility.findOne({
//     where: {
//       api_token: authorization,
//     },
//   });

//   if (!user) throw new ErrorResponse("forbidden", 403);
//   else if (user.type >= 3 || user.type < 1)
//     throw new ErrorResponse("forbidden", 403);

//   ctx.state.user = user;

//   await next();
// });

// module.exports = merchantProtect;
