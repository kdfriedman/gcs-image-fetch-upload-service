import React, { useState, useEffect } from "react";
import axios from "axios";

const StorageBucketValidator = ({
  bucketStatus,
  updateBucketStatus,
  profile,
}) => {
  // two way binding for modal form - update state with input value
  const [inputValue, setInputValue] = useState("");
  const [bucketName, updateBucketName] = useState("");
  // const [bucketStatus, updateBucketStatus] = useState(false);
  const [bucketError, updateBucketError] = useState(null);

  // bind input to input value attribute
  const bindInputToValue = (e) => {
    const input = e.target.closest('[name="bucket-input"]');
    if (!input) return;
    setInputValue(input.value);
  };

  const handleSubmit = (e, input) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form").elements;
    const bucketStorageInput = form["bucketStorageInput"];
    // check if bucket input has value, then return with error
    if (bucketStorageInput.value === "") {
      return updateBucketError("Invalid submit: Please enter a bucket name");
    }
    if (bucketStorageInput.value === bucketName) return;

    // reset bucket error state
    updateBucketError(null);
    // clear bucket status from previous request
    updateBucketStatus(false);

    //update bucket name state with new input value
    updateBucketName(bucketStorageInput.value);
  };

  useEffect(() => {
    (async () => {
      const fetchData = async () => {
        axios
          .post(process.env.API_ENDPOINT, {
            bucketName,
          })
          .then((data) => {
            console.log(data);
            // descructure bool val from bucket status response
            const [hasRequestedBucket] = data.data;
            updateBucketStatus(hasRequestedBucket);
          })
          .catch((error) => {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              return updateBucketError(error.response.data);
            }
            if (error.request) {
              // The request was made but no response was received
              // possibly a network error
              return updateBucketError(
                "Status Failed: The server did not return a response. This may be due to a network error."
              );
            }
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          });
      };
      if (bucketName !== "") {
        fetchData();
      }
    })();
  }, [bucketName]);

  return (
    <div className="container">
      <h1 className="success__message">
        Welcome, {profile?.name?.givenName || "friend"}! Thanks for
        authenticating with your Huge account.
      </h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label className="success__bucket-name">
          Enter the name of your storage bucket
        </label>
        <input
          id="bucketStorageInput"
          name="bucket-input"
          onChange={bindInputToValue}
          value={inputValue}
          type="text"
        />
        <button className="success__button" type="submit">
          Find Storage Bucket
        </button>
      </form>
      {bucketError && (
        <div className="success__bucket-error">{bucketError}</div>
      )}
      {bucketStatus && (
        <div className="success__bucket-available">Bucket is available</div>
      )}
    </div>
  );
};

export default StorageBucketValidator;
