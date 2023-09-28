const jwt = require("jsonwebtoken");
const config = require("../config/auth");
// const model = db.model;

exampleMiddlewareFunction = () => {
  return (req, res, next) => {
    let tokenWithBearer = req.headers.authorization;
    if (tokenWithBearer) {
      const token = tokenWithBearer.split(" ")[1];
      //verifikasi
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.status(401).send({
            statusCode: 401,
            message: err,
            success: false,
          });
        } else {
          req.user = decoded;
          next();
        }
      });
    } else {
      return res.status(404).send({
        statusCode: 404,
        message: "Token not found",
        success: false,
      });
    }
  };
};

const verify = {
  exampleMiddlewareFunction: exampleMiddlewareFunction,
};

module.exports = verify;
