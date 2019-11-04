const http = require("http"),
  server = http.createServer();
const axios = require("axios");

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

server.listen(3000, () => {
  console.log("Node server created at port 3000");
});
