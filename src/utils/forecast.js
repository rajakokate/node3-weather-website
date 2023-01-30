const request = require("request");
const foreCast = (address, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=a97536b3db818d2f80b38d559a6f2b36&query=" +
    address +
    "&units=m";

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        ` ${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature}°C out and There is a ${response.body.current.precip}% chances of rain. `
      );
    }
  });
};
module.exports = foreCast;
