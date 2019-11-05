const http = require("http"),
  server = http.createServer();
const axios = require("axios");
const sqlite3 = require("sqlite3").verbose();
const nodemailer = require("nodemailer");

//set up nodemailer
var transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mjdomiotest@gmail.com",
    pass: "#98C2Qf3bdL*7JIF"
  }
});

//connect to sqlite db
let db = new sqlite3.Database("./db/properties.db", err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the properties SQlite database.");
});

//create property history table if it does not exist
db.run(
  "CREATE TABLE IF NOT EXISTS property_history(id TEXT, type TEXT, dynamicDisplayPrice REAL, basePrice REAL, datetime TEXT)"
);

//check if the dynamic display price is greater than or less than the base price
const displayVsBaseComparison = property => {
  let comparison = "";
  if (property.dynamicDisplayPrice < property.basePrice) {
    comparison = "less";
  } else if (property.dynamicDisplayPrice > property.basePrice) {
    comparison = "greater";
  }
  return comparison;
};

//check if an email should be sent - if apartment display price is less than base or if home display price is greater than base
const checkSendEmail = property => {
  if (
    displayVsBaseComparison(property) == "less" &&
    property.type == "apartment"
  ) {
    return true;
  } else if (
    displayVsBaseComparison(property) == "greater" &&
    property.type == "home"
  ) {
    return true;
  }
  return false;
};

//send notifaction email using nodemailer
const sendEmail = property => {
  const message = {
    from: "properties@staydomio.com",
    to: "mark@hellomark.dev",
    subject: "Domio Property Price Update",
    text:
      "Dynamic price for " +
      property.type +
      " at " +
      property.address +
      " is " +
      displayVsBaseComparison(property) +
      " than the listing's base price."
  };
  transport.sendMail(message, function(err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

const loopProperties = properties => {
  let datetime = Date.now();
  for (let index = 0; index < properties.length; index++) {
    const property = properties[index];
    if (checkSendEmail(property)) {
      sendEmail(property);
    }
    function saveProperty(property) {
      console.log("here");
      let sql =
        "INSERT INTO property_history (id, type, dynamicDisplayPrice, basePrice, datetime) ";
      sql += "VALUES (?, ?, ?, ?, ?) ";
      db.run(
        sql,
        [
          property.id,
          property.type,
          property.dynamicDisplayPrice,
          property.basePrice,
          datetime
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
      loopProperties(response.data.properties);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
};

setInterval(getProperties, 5000);

server.listen(3000, () => {
  console.log("Node server created at port 3000");
});
