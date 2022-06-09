/**
 * @param {number} bytes Bytes to convert (Bytes, KB, MB, GB, TB, PB, EB, ZB, YB)
 * @param {number} fixed The number of decimal places when converting the bytes (by default 2)
 * @returns {string}
 */
function Size(bytes, fixed = 2) {
  let k = 1024;
  let sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  let i = Math.floor(Math.log(bytes) / Math.log(k));

  if (bytes == 0) return "0 Bytes";
  if (!bytes) throw new Error("you have to set a bytes");
  // return parseFloat((bytes / Math.pow(k, i)).toFixed(fixed)) + " " + sizes[i];
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(fixed))} ${sizes[i]}`;
}

module.exports = Size;
