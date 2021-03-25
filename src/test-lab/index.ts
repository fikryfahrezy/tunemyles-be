import fileA from "./fileA";
import fileAinIdx from "./fileA";
import fileB from "./fileB";

console.log("clg file A from index", fileAinIdx);
console.log("clg file B from index", fileB);
console.log("hello from index");
// async function getUser(id: number) {
//  await null;
//  if (id === 9999) throw Error("with all frames present");
//    return { id };
// }

// const userIds = [...Array(10000).keys()];

// 👍 now the line below is in the stacktrace

/// const timeOne = Date.now();
//  Promise.all(userIds.map(async (id) => await getUser(id))).catch((err) => {
//   const timeOneLast = Date.now();
//   console.log(timeOneLast - timeOne);
//   console.log(err);
// });

// const timeTwo = Date.now();
// Promise.all(userIds.map(async (id) => await getUser(id))).catch((err) => {
//   const timeTwoLast = Date.now();
//   console.log(timeTwoLast - timeTwo);
//   console.log(err);
// });
