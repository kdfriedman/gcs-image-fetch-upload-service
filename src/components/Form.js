import React, { useState, useEffect } from "react";
import axios from "axios";

const Form = (props) => {
  // two way binding for modal form - update state with input value
  const [inputValue, setInputValue] = useState("");
  const [bucketName, updateBucketName] = useState("");
  const [bucketStatus, updateBucketStatus] = useState(false);

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
    updateBucketName(bucketStorageInput.value);
  };

  useEffect(() => {
    (async () => {
      try {
        const fetchData = async () => {
          const data = await axios.post(process.env.API_ENDPOINT, {
            bucketName,
          });
          // descructure bool val from bucket status response
          const [hasRequestedBucket] = data.data;
          updateBucketStatus(hasRequestedBucket);
        };
        if (bucketName !== "") {
          fetchData();
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [bucketName]);

  return (
    <div className="container">
      <h1 className="success__message">
        Welcome, {props?.profile?.profile?.name?.givenName || "friend"}! Thanks
        for authenticating with your Huge account.
      </h1>
      <form onSubmit={(e) => handleSubmit(e)}>
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
      {bucketStatus && (
        <div className="success__bucket-available">Bucket is available</div>
      )}
    </div>
  );
};

export default Form;
