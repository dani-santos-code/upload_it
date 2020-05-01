const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routers/userRoutes");
const imageRouter = require("./routers/imageRoutes");
require("./db/mongoose"); // this allows us to make sure we're connecting to the DB
const cors = require("cors");
const app = express();
const whitelist = ["http://127.0.0.1:3001", "http://localhost:3001"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(express.json()); // it parses incoming json to a JS object
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use("/api/v1", userRouter);
app.use("/api/v1", imageRouter);

module.exports = app;
