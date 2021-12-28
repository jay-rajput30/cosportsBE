const mongoose = require("mongoose");
require("dotenv/config");

function initializeDBConnection() {
  mongoose
    .connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("connected to database"))
    .catch((error) => console.log("Connection failed...", error));
}
module.exports = { initializeDBConnection };
