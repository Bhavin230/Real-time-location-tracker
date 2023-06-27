const mongoose = require("mongoose");
const logger = require('../logger/index')
const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((data) => {
      logger.info(`Mongodb connected with server: ${data.connection.host}`);
    });
};

module.exports = connectDatabase;
