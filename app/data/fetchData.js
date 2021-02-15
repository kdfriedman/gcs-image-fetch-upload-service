const axios = require("axios");

exports.fetchData = async (data, acctId) => {
  // check that type is array
  if (!Array.isArray(data) || typeof data !== "object") return;
  try {
    const listOfImageRequests = data.map(async (datum) => {
      return await axios.get(`https://s0.2mdn.net/${acctId}/${datum}.jpg`);
    });
    return Promise.allSettled(listOfImageRequests);
  } catch (err) {
    console.error(err);
  }
};
