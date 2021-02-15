// validate file upload or drag onDrop
const testForValidCSVFile = (file, eventTarget) => {
  // store file pathname
  const fileName = eventTarget.value;
  const fileTypeDotIndexPosition = fileName.lastIndexOf(".") + 1;
  const slicedFileTypeFromFilePath = fileName.slice(fileTypeDotIndexPosition);

  // csv validation regex
  const hasCSVFile = /((text)\/(csv|xls|xlsx))/i;
  const hasInvalidFileType = !hasCSVFile.test(file.type);
  const hasInvalidFilePath = !hasCSVFile.test(
    `text/${slicedFileTypeFromFilePath}`
  );

  // prettier-ignore
  // if invalid file type is uploaded, return function
  if (hasInvalidFileType || hasInvalidFilePath) return;
  return file;
};

// wrap FileReader api in promise to handle as async operation. FileReader does not return promise natively.
const readURL = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      resolve(e.target.result);
    };
    fileReader.onerror = (e) => reject(e);
    // convert file to text string
    fileReader.readAsText(file);
  });
};

export { testForValidCSVFile, readURL };
