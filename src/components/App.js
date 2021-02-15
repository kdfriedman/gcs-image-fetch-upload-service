import React, { useState } from "react";
import StorageBucketValidator from "./StorageBucketValidator";
import FileUploader from "./FileUploader";
import FileSender from "./FileSender";

const App = ({ profile }) => {
  // storage bucket state
  const [bucketStatus, updateBucketStatus] = useState(false);
  const [csvFile, updateCSVFile] = useState(null);

  return (
    <div id="appContainer">
      {/* render storage bucket validator component to check for existing storage bucket */}
      <StorageBucketValidator
        updateBucketStatus={updateBucketStatus}
        bucketStatus={bucketStatus}
        profile={profile}
      />
      <div className="button-container">
        {csvFile && <FileSender csvFile={csvFile} />}
        {/* once valid bucket is available, render file uploader component and pass in file state as props */}
        {bucketStatus && (
          <FileUploader csvFile={csvFile} updateCSVFile={updateCSVFile} />
        )}
      </div>
    </div>
  );
};

export default App;
