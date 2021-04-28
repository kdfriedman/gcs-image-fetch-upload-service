const axios = require("axios");
const fs = require("fs");

exports.fetchData = async (data) => {
  // check that type is array
  if (!Array.isArray(data) || typeof data !== "object") return;

  const listOfImagePromises = data.map(async (row) => {
    // manipulate csv data into acct id and file name strings for requests
    const splitIntoCol = row.split(",");
    const [acctId, creativeName] = splitIntoCol;
    // fetch images from external resource
    try {
      const response = await axios.get(
        `${
          process.env.CREATIVE_IMAGE_ENDPOINT
        }/${acctId}/${creativeName.trim()}`,
        {
          responseType: "stream",
        }
      );
      // store images in temp storage via temp-images directory prior to uploading to gcp storage buckets
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
