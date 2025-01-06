const jwt = require("jsonwebtoken");

const getJwtToken = (info) => {
  const token = jwt.sign({ id: info }, process.env.JWT_SECRET);
  return token;
};

module.exports = {
  getJwtToken,
};
