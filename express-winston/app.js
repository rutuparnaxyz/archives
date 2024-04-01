const express = require("express");
const app = express();
const morgan = require("morgan");
const winston = require("./config/winston");

app.use(morgan("combined", { stream: winston.stream }));
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // add this line to include winston logging
  winston.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  );

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(5000, (req, res) => {
  console.log("Server is up and running on port 5000");
});
