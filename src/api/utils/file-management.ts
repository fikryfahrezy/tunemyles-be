import pmp from 'pump';
import stream from 'stream';
import fs from 'fs';
import util from 'util';
import type { AddedFileBody } from '../types/schema';

const pump = util.promisify(pmp) as (...streams: Array<pmp.Stream | pmp.Callback>) => Promise<void>;

export const saveFiles: (files: AddedFileBody[]) => Promise<void> = async (
  files: AddedFileBody[],
) => {
  await Promise.all(
    files.map(({ filename, data }) => {
      const destFile = `./public/image/${filename}`;
      const streamFile = stream.Readable.from(data);
      const dest = fs.createWriteStream(destFile);
      return pump(streamFile, dest);
    }),
  );
};

export const test = 'hi';
// "use strict";

// const multer = require("@koa/multer");
// const slugify = require("slugify");
// const path = require("path");
// const ErrorResponse = require("./ErrorResponse");

// // https://github.com/expressjs/multer/issues/170
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/img");
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     let name = slugify(file.originalname, { lower: true });

//     // https://stackoverflow.com/questions/9694930/remove-all-occurrences-except-last
//     name = name.replace(/[.](?=.*[.])/g, "");
//     const [originalName, ext] = name.split(".");
//     if (req.url.includes("banks") || req.url.includes("wallets")) {
//       name = `${originalName}_logo.${ext}`;
//     } else if (req.url.includes("categories")) {
//       name = `${originalName}_icon.${ext}`;
//     } else if (req.url.includes("medias")) {
//       name = `${originalName}_medias.${ext}`;
//     }

//     cb(null, `${uniqueSuffix}-${name}`);
//   },
// });

// const fileFilter = function (_, file, cb) {
//   const filetypes = /jpeg|jpg|png/;
//   const mimetype = filetypes.test(file.mimetype);
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//   if (mimetype && extname) {
//     cb(null, true);
//   } else {
//     cb(new ErrorResponse("please upload an image file", 400), false);
//   }
// };

// const upload = multer({
//   fileFilter,
//   storage: storage,
// });

// module.exports = upload;
