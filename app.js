const http = require("http"),
  server = http.createServer();
const axios = require("axios");
const sqlite3 = require("sqlite3").verbose();

//connect to sqlite db
let db = new sqlite3.Database("./db/properties.db", err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the properties SQlite database.");
});

//create property history table if it does not exist
db.run(
  "CREATE TABLE IF NOT EXISTS property_history(id TEXT, type TEXT, dynamicDisplayPrice REAL, basePrice REAL, dateTime TEXT)"
);

const getProperties = () => {
  axios
    .get("https://interview.domio.io/properties/")
    .then(function(response) {
      // handle success
      console.log(response);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
};
getProperties();

//setInterval(getProperties, 5000);

server.listen(3000, () => {
  console.log("Node server created at port 3000");
});
