const express = require("express");
const router = express.Router();

const {
  checkStorageBucketStatus,
  uploadImageFilesToStorageBucket,
  uploadCSVFileToStorageBucket,
} = require("../config/gcp-storage/storage-buckets");
const { validateAuth } = require("../middleware/auth");
const { fetchData } = require("../data/fetchData");
const EventEmitter = require("events");
const directoryListEventEmitter = new EventEmitter();

// @desc    Validate Cloud Storage API
// @route   POST /api/v1/storage
router.post("/storage", validateAuth, (req, res) => {
  (async () => {
    try {
      // check for viable storage bucket, using Google Storage API
      const hasStorageBucket = await checkStorageBucketStatus(
        req?.body?.bucketName
      );
      // if storage bucket name is wrong or does not return 201, Google will throw an error
      if (!hasStorageBucket[0]) {
        return res
          .status(403)
          .json(
            "403 Forbidden: You do not have access to the Google Cloud Storage bucket"
          );
      }
      // return bucket status as 201
      res.status(201).json(hasStorageBucket);
    } catch (err) {
      console.error(err);
      return res
        .status(403)
        .json(
          "403 Forbidden: You do not have access to the Google Cloud Storage bucket"
        );
    }
  })();
});

// @desc    Fetch images from Google
// @route   POST /api/v1/image-fetcher
router.post("/image-fetcher", validateAuth, (req, res) => {
  const csvFileObject = req.files.csv;
  // convert buffer into workable string data
  const parsedCSVFile = req?.files?.csv?.data.toString();
  // split string of data into array of string row data
  const arrOfCSVData = parsedCSVFile.split("\n");
  // remove header row from data and save in new variable reference
  const removedHeaderCSVData = arrOfCSVData.slice(1, arrOfCSVData.length - 1);

  (async () => {
    try {
      // upload csv file to storage bucket
      await uploadCSVFileToStorageBucket(
        csvFileObject,
        process.env.STORAGE_BUCKET_NAME
      );
      // fetch images from endpoint using csv file as input
      await fetchData(removedHeaderCSVData);
      // update image list to storage bucket
      // pass in bucket name, image directory, and event emitter to send back image file from directory to use in upload
      uploadImageFilesToStorageBucket(
        process.env.STORAGE_BUCKET_NAME,
        "temp-images",
        directoryListEventEmitter
      );
      return res.json({
        data: "The images have been fetched and uploaded to the storage bucket",
      });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json(
          `HTTP 500 - There is an issue with the server, please try again later.`
        );
    }
  })();
});

module.exports = router;
