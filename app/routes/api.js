const express = require("express");
const router = express.Router();
const checkStorageBucketStatus = require("../config/gcp-storage/storage-buckets");
const { validateAuth } = require("../middleware/auth");

router.post("/storage", validateAuth, (req, res) => {
  (async () => {
    try {
      // check for viable storage bucket
      const hasStorageBucket = await checkStorageBucketStatus(
        req?.body?.bucketName
      );
      if (!hasStorageBucket[0]) {
        return res
          .status(404)
          .send("HTTP 404: There is no available storage bucket to access");
      }
      // return bucket status as 201
      res.status(201).json(hasStorageBucket);
    } catch (err) {
      console.error(err);
    }
  })();
});

module.exports = router;
