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

module.exports = router;
