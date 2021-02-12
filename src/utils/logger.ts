// "use strict";

// const { createLogger, format, transports } = require("winston");
// const { combine, timestamp, json } = format;

// const logger = createLogger({
//   format: combine(timestamp(), json()),
//   transports: [
//     new transports.File({ filename: "logs/error.log", level: "error" }),
//     new transports.File({ filename: "logs/info.log", level: "info" }),
//     new transports.File({ filename: "logs/warn.log", level: "warn" }),
//     new transports.File({ filename: "logs/info.log", level: "info" }),
//     new transports.File({ filename: "logs/http.log", level: "http" }),
//     new transports.File({ filename: "logs/verbose.log", level: "verbose" }),
//     new transports.File({ filename: "logs/debug.log", level: "debug" }),
//     new transports.File({ filename: "logs/silly.log", level: "silly" }),
//   ],
//   exceptionHandlers: [new transports.File({ filename: "logs/exceptions.log" })],
//   exitOnError: false,
// });

// module.exports = logger;
