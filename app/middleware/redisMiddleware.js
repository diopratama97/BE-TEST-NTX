const redis = require("redis");

exports.cache = (req, res, next) => {
  let client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
  });

  client.connect();

  client.get("redis-fetch-api").then((data, err) => {
    if (err) {
      throw err;
    }
    if (!data) {
      return next();
    } else {
      return res.status(200).send({
        success: true,
        statusCode: 200,
        data: JSON.parse(data),
      });
    }
  });
};
