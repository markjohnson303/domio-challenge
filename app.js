const http = require("http"),
  server = http.createServer();
const axios = require("axios");
const properties = require("./propertiesApi.js");

properties.getProperties();

server.listen(3000, () => {
  console.log("Node server created at port 3000");
});
