import React from "react";

import ErrorImage from "../../assets/Images/404-error.svg";

const ErrorPage = () => {
  return (
    <>
      <div className="container d-flex p-3">
        <div className="container">
          <img
            src={ErrorImage}
            className="col-md-6 float-md-end mb-3 ms-md-3"
            alt="..."
            style={{ maxWidth: "100%" }}
          />
          <div className="container">
            <h1 className="fw-bold text-primary">Oops!</h1>
            <h2 className="mb-3">404 - Page Not Found</h2>
            <p className="mb-3 fst-italic">
              "The page you are looking for might have been removed had its name
              changed or is temporarily unavailable."
            </p>
            <p className="mb-3">
              But don't worry, you can find plenty of other things on our
              homepage.
            </p>
            <a href="/" className="btn btn-primary btn-lg mt-3">
              Home Page
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
