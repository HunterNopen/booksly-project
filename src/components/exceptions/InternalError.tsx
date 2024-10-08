import React from "react";
import { NavLink } from "react-router-dom";

const InternalError = () => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <h1 className="display-1 fw-bold">501</h1>
          <p className="fs-3">
            {" "}
            <span className="text-danger">Opps!</span> Looks like not today...
          </p>
          <p className="lead">Whooops... Smth went wrong...</p>
          <NavLink to="/" className="btn btn-primary">
            Go Home
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default InternalError;
