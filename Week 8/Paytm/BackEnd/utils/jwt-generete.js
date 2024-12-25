const jwt = require("jsonwebtoken");

const getJwtToken = (info) => {
  const token = jwt.sign({ username: info }, process.env.JWT_SECRET);
  return token;
};

module.exports = {
  getJwtToken,
};
