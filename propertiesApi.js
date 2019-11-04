const axios = require("axios");

const getProperties = () => {
  console.log("here");
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

module.exports = Object.assign({ getProperties });
