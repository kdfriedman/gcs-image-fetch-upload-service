const path = require("path");
const fs = require("fs").promises;
const { Storage } = require("@google-cloud/storage");
const storage = new Storage();
const {
  readDirectoryContents,
  removeDirectoryContents,
} = require("../../util/util");

const checkStorageBucketStatus = async (bucketName) => {
  const bucket = storage.bucket(bucketName);
  const hasStorageBucket = await bucket.exists();
  return hasStorageBucket;
};

const uploadCSVFileToStorageBucket = async (csvFile, bucketName) => {
  try {
    // write file to temp-files directory
    await fs.writeFile(`./temp-files/${csvFile.name}`, csvFile.data);
    console.log(`csv file written to ./temp-files/${csvFile.name}`);

    // after csv file is written to local directory, upload to gcp storage bucket
    await storage.bucket(bucketName).upload(`./temp-files/${csvFile.name}`, {
      destination: `creative_images_performance_input_raw/${csvFile.name}`, // upload files to input folder
    });
    // remove csv file after uploading to storage bucket
    removeDirectoryContents("temp-files");
  } catch (err) {
    console.log(err);
  }
};

const uploadImageFilesToStorageBucket = (
  bucketName,
  directoryName,
  directoryListEventEmitter
) => {
  // readDirectoryContents dependency injection - util function
  readDirectoryContents(directoryName, directoryListEventEmitter);

  // listen for directory list update with files from async util function
  directoryListEventEmitter.once("directoryContentsRead", async (...files) => {
    // get absolute path and join current directory
    const directoryPath = path.join(__dirname, `../../../temp-images`);
    // flatten array to remove nested array file names
    const fileList = files.flat();
    // loop through file list and upload each file to storage bucket
    fileList.forEach(async (file) => {
      // Uploads a local file to the bucket
      await storage.bucket(bucketName).upload(`${directoryPath}/${file}`, {
        destination: `creative_images_input_raw/${file}`, // upload files to input folder
      });
      console.log(`${file} uploaded to ${bucketName}.`);
      // readDirectoryContents dependency injection - util function
      removeDirectoryContents(directoryName);
    });
  });
};

module.exports = {
  checkStorageBucketStatus,
  uploadImageFilesToStorageBucket,
  uploadCSVFileToStorageBucket,
};
