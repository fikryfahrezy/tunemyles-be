// "use strict";

// const asyncHandler = require("./async-handler");
// const UserUtility = require("../models/UserUtility");
// const ErrorResponse = require("../utils/ErrorResponse");

// const adminProtect = asyncHandler(async (ctx, next) => {
//   const { authorization } = ctx.header;
//   if (!authorization) throw new ErrorResponse("forbidden", 403);

//   const user = await UserUtility.findOne({
//     where: {
//       api_token: authorization,
//     },
//   });
//   if (!user) throw new ErrorResponse("forbidden", 403);
//   else if (user.type !== 2 || user.type >= 3)
//     throw new ErrorResponse("forbidden", 403);

//   ctx.state.user = user;

//   await next();
// });

// module.exports = adminProtect;
