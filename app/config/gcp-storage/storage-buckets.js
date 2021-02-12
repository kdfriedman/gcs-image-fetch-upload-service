const { Storage } = require("@google-cloud/storage");
const storage = new Storage();

const checkStorageBucketStatus = async (bucketName) => {
  const bucket = storage.bucket(bucketName);
  const hasStorageBucket = await bucket.exists();
  return hasStorageBucket;
};

module.exports = checkStorageBucketStatus;
