const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middleware/error");
const {isAuthenticatedUser}= require("./middleware/auth");
// Config
// console.log(typeof(isAuthenticatedUser));
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.static("public"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Route Imports
const userRoute = require("./routes/userRoute");
const locationRoute = require("./routes/locationRoute");
const connectionRoute = require("./routes/connectionRoute");
const groupRoute = require("./routes/groupRoute");
app.use(isAuthenticatedUser);
app.use("/api/v1", userRoute);
app.use("/api/v1", locationRoute);
app.use("/api/v1",connectionRoute);
app.use("/api/v1",groupRoute);
// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });

// Middleware for Errors

app.use(errorMiddleware);


module.exports = app;
