const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 5000;

// Define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handlebars and views
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Rutuparna Rout",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Rutuparna Rout",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is a fun POC. You can reach me @r7.rutuparna@gmail.com",
    title: "Help",
    name: "Rutuparna Rout",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please specify an address to proceed...",
    });
  }
  geoCode(
    req.query.address,
    (error, { longitude, latitude, placeName } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          placeName,
          forecast: forecastData.summary,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorText: "Help article not found.",
    title: "Help",
    name: "Rutuparna Rout",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorText: "Page not found",
    title: "Error Page",
    name: "Rutuparna Rout",
  });
});

app.listen(port, () => {
  console.log("Server is up and running on port " + port + "!!!");
});
