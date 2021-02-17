const axios = require("axios");
const fs = require("fs");

exports.fetchData = async (data) => {
  // check that type is array
  if (!Array.isArray(data) || typeof data !== "object") return;

  const listOfImagePromises = data.map(async (row) => {
    const splitIntoCol = row.split(",");
    const [acctId, creativeName] = splitIntoCol;
    try {
      const response = await axios.get(
        `${
          process.env.CREATIVE_IMAGE_ENDPOINT
        }/${acctId}/${creativeName.trim()}`,
        {
          responseType: "stream",
        }
      );
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(`./temp-images/${creativeName.trim()}`))
          .on("finish", resolve)
          .on("error", reject);
      });
    } catch (err) {
      console.error(err);
    }
  });
  return Promise.allSettled(listOfImagePromises);
};
