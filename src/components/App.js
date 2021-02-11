import React from "react";

const App = (props) => {
  const handleUpload = (e) => {
    console.log("test", "other test");
  };
  return (
    <div className="container">
      <h1 className="success__message">
        Welcome, {props?.profile?.name?.givenName || "friend"}! Thanks for
        logging in.
      </h1>
      <button onClick={handleUpload} className="success__button">
        Upload
      </button>
    </div>
  );
};

export default App;
