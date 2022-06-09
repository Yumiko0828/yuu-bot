/**
 * @param {Date} date Date formats to convert (AM or PM).
 */
function format1(date) {
  if (!date) throw new Error("you have to set a date");

  let ampm = date.getHours() > 12 ? "PM" : "AM";
  let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  let minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

  return `${hours}:${minutes} ${ampm}`;
}

/**
 * @param {Date} date Date formats to convert (Day / Month / Year).
 */
function format2(date) {
  if (!date) throw new Error("you have to set a date");

  return `${date.toLocaleDateString()}`;
}

exports.format1 = format1;
exports.format2 = format2;
