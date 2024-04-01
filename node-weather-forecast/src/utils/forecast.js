const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/a42eef3fe818e9234babc24920746383/" +
    longitude +
    "," +
    latitude +
    "?unit=si";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect the weather service.", undefined);
    } else if (body.error) {
      callback(error, undefined);
    } else {
      callback(undefined, {
        summary: body.daily.data[0].summary,
        temperature: body.currently.temperature,
      });
    }
  });
};

module.exports = forecast;
