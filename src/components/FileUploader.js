import React, { useState, useRef } from "react";
import { testForValidCSVFile } from "../util/util";

const FileUploader = ({ csvFile, updateCSVFile }) => {
  const fileInputRef = useRef();
  const [fileName, updateFileName] = useState(null);

  const handleInputFileChange = (e) => {
    // check if file has length to determine if file has been selected or canceled
    if (e.target.files.length === 0) return;

    // run validate function, then store output file in variable
    const hasValidCSVFile = testForValidCSVFile(e.target.files[0], e.target);

    // validate uploaded file
    if (!hasValidCSVFile) return;

    // update state with csv file to use for api post req
    updateCSVFile({ file: hasValidCSVFile });
    // update state with valid file name to alert the user that a file has been uploaded
    updateFileName(e.target.files[0].name);
  };

  return (
    <div className="file-uploader__wrapper">
      <div className="file-uploader-btn-wrapper">
        <label className="file-uploader__btn">
          Upload File
          <input
            style={{ display: "none" }}
            id="fileUploaderInput"
            type="file"
            accept=".csv, text/csv, text/comma-separated-values, application/csv"
            onChange={handleInputFileChange}
            ref={fileInputRef}
            name="csv"
          />
        </label>
        {csvFile && <div className="file-uploader__file-name">{fileName}</div>}
      </div>
      <div className="file-uploader__required-file-types">
        *Accepts valid csv files only
      </div>
    </div>
  );
};

export default FileUploader;
