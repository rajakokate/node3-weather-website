const path = require("path");
const express = require("express");
const hbs = require("hbs");
const foreCast = require("./utils/forecast");
const geoCode = require("./utils/geocode");

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'));

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");

const partialsPath = path.join(__dirname, "../templates/partials");
// setup handlebars engine and view location
app.set("view engine", "hbs"); // to setup handlebars
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup  static directory to server
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather ",
    name: " Raja ",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Raja ",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is some helpful text",
    name: "Raja",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geoCode(req.query.address, (error, data={}) => {
    if (error) {
      return res.send({ error}) // here if there is any error we use return where it will stop executing
    }

    foreCast(data.location, (error, forecastData) => {
      if (error) {
        return res.send({error})
      }

     res.send({
      forecast: forecastData ,
      location: data.location,
      address: req.query.address
      
     });
    });
  }) 
});

//express router handler
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    name: "Raja Kokate",
    errorMessage: "Help article",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Raja",
    errorMessage: "Page",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
