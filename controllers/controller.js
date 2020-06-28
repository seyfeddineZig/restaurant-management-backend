module.exports = {
  dateNow() {
    let d = new Date();
    return (
      d.getFullYear() +
      "-" +
      (d.getMonth() + 1 < 10 ? "0" : "") +
      (d.getMonth() + 1) +
      "-" +
      (d.getDate() < 10 ? "0" : "") +
      d.getDate() +
      " 00:00:00"
    );
  }
};
