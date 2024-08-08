import React from "react";
import logo from '../../assets/logo.png';

const Footer = () => {
  return (
    <>
      <footer className="d-flex flex-wrap justify-content-between align-items-center bg-dark fixed-bottom" style={{padding: "0px 15px 0px 15px",}}>
        <p className="col-md-4 mb-0 text-light">© 2022 Company, Inc</p>

        <img src={logo} className="img-fluid" style={{maxWidth: 200, maxHeight: 100}}/>

        <ul className="nav col-md-4 justify-content-end">
          <li className="nav-item">
            <a href="home" className="nav-link px-2 text-light">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-warning disabled">
              Features
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-warning disabled">
              Pricing
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-warning disabled">
              FAQs
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-warning disabled">
              About
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default Footer;
