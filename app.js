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

const writeProperties = properties => {
  let dateTime = Date.now();
  for (let index = 0; index < properties.length; index++) {
    const property = properties[index];
    function saveProperty(property) {
      console.log("here");
      let sql =
        "INSERT INTO property_history (id, type, dynamicDisplayPrice, basePrice, dateTime) ";
      sql += "VALUES (?, ?, ?, ?, ?) ";
      db.run(
        sql,
        [
          property.id,
          property.type,
          property.dynamicDisplayPrice,
          property.basePrice,
          dateTime
        ],
        function(error) {
          if (error) {
            console.log(error);
          } else {
            console.log("Last ID: " + this.lastID);
            console.log("# of Row Changes: " + this.changes);
          }
        }
      );
    }
    saveProperty(property);
  }
};

const getProperties = () => {
  axios
    .get("https://interview.domio.io/properties/")
    .then(function(response) {
      // handle success
      //console.log(response);
      writeProperties(response.data.properties);
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
