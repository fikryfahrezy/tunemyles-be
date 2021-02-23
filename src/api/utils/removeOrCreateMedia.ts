// const fs = require("fs");
// const Media = require("../models/Media");

// exports.removeOrCreateMedia = async (media, newMedia) => {
//   const { uri, label } = newMedia;
//   if (media && !media.uri.includes("no-image.jpg")) {
//     const oldLogo = media.uri;
//     media.uri = uri;
//     media.label = label;
//     fs.unlink(`public${oldLogo}`, () => {});
//     return { media, removed: true };
//   } else {
//     return { media: Media.create(newMedia), removed: false };
//   }
// };
