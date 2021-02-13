import React, { useState } from "react";
import StorageBucketValidator from "./StorageBucketValidator";
import FileUploader from "./FileUploader";

const App = ({ profile }) => {
  // storage bucket state
  const [bucketStatus, updateBucketStatus] = useState(false);

  return (
    <>
      <StorageBucketValidator
        updateBucketStatus={updateBucketStatus}
        bucketStatus={bucketStatus}
        profile={profile}
      />
      {bucketStatus && <FileUploader />}
    </>
  );
};

export default App;
