import React, { useState, useEffect } from "react";
import axios from "axios";

const FileSender = ({ csvFile }) => {
  const [isFetchReady, updateIsFetchReady] = useState(false);
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
    // pass in csv file into axios argument list for post req
    axios
      .post(process.env.API_IMAGE_FETCHER_ENDPOINT, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          return console.log(error.response);
        }
        if (error.request) {
          // The request was made but no response was received
          // possibly a network error
          return console.log(error.request);
        }
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      });
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
