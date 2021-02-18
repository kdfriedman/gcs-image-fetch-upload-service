import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const FileSender = ({ csvFile }) => {
  const [isFetchReady, updateIsFetchReady] = useState(false);
  const [isLoading, updateIsLoading] = useState(false);
  // create new FormData object for sending csv file to server
  const formData = new FormData();
  // append uploaded csv file to FormData object for use in post request
  formData.append("csv", csvFile.file);

  const handleFileSend = (e) => {
    e.preventDefault();
    // if csvFile is valid, update state to fetch image-fetcher data via post
    if (csvFile) {
      updateIsFetchReady(true);
    }
  };

  const fetchData = async (formData) => {
    // activate the loading state
    updateIsLoading(true);
    try {
      // pass in csv file into axios argument list for post req
      const data = await axios.post(
        process.env.API_IMAGE_FETCHER_ENDPOINT,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);
      // reset the loading state
      updateIsLoading(false);
    } catch (error) {
      // reset the loading state
      updateIsLoading(false);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return console.error(error.response);
      }
      if (error.request) {
        // The request was made but no response was received
        // possibly a network error
        return console.error(error.request);
      }
      // Something happened in setting up the request that triggered an Error
      console.error("Error", error.message);
    }
  };

  useEffect(() => {
    // only run when isFetchReady is updated with truthy value
    if (isFetchReady) {
      // init post req to server, passing valid csv file
      fetchData(formData);
      // reset isFetchReady state to false
      updateIsFetchReady(false);
    }
  }, [isFetchReady]);

  return (
    <>
      {isLoading && (
        <>
          <div className="file-sender__loader-container">
            <AiOutlineLoading3Quarters className="file-sender__loader" />
          </div>
        </>
      )}
      <div className="file-sender__wrapper">
        <form
          encType="multipart/form-data"
          onSubmit={handleFileSend}
          id="fileSenderForm"
        >
          <button type="submit" className="file-sender__submit-button">
            Send File
          </button>
        </form>
      </div>
    </>
  );
};

export default FileSender;
