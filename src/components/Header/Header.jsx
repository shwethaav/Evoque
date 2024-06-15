import React from "react";
import "./Header.scss";
import img from "../../assets/Ellipse.png";
import { CgMenuGridO } from "react-icons/cg";

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-lg col-10 col-lg-10 p-0">
          <a className="navbar-brand col-4 fw-bold text-dark" href="/">
            Evoque Inovative Lab
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <CgMenuGridO />
            </span>
          </button>
          <div
            className="collapse navbar-collapse col-lg-8 d-lg-flex justify-content-lg-between"
            id="navbarSupportedContent"
          >
            <ul className="nav_List navbar-nav mb-2 mb-lg-0 col-lg-7 col-xl-6 d-flex justify-content-between">
              <li className="nav-item">
                <a className="nav-link p-0 my-2 my-lg-0" aria-current="page" href="/">
                  About
                </a>
                <img src={img} alt="decorative dot" />
              </li>
              <li className="nav-item marketplace">
                <a className="nav-link p-0 my-2 my-lg-0" href="/" style={{ color: "#0461D1" }}>
                  Marketplace
                </a>
                <img src={img} alt="decorative dot" style={{ color: "#0461D1" }} />
              </li>
              <li className="nav-item">
                <a className="nav-link p-0 my-2 my-lg-0" href="/">
                  Resources
                </a>
                <img src={img} alt="decorative dot" />
              </li>
              <li className="nav-item">
                <a className="nav-link p-0 my-2 my-lg-0" href="/">
                  Contact
                </a>
                <img src={img} alt="decorative dot" />
              </li>
            </ul>
            <div
              className="d-flex justify-content-between justify-content-lg-end gap-lg-2 col-7 col-sm-5 col-md-4 col-lg-5 col-xl-3"
              role="search"
            >
              <button className="btn btn-outline-primary col-5 col-lg-5 px-0" type="submit">
                Login
              </button>
              <button className="btn btn-outline-primary bg-primary col-5 col-lg-5 text-white px-0" type="submit">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="w-100 d-flex justify-content-center">
        <div id="header" className="row col-10 d-flex justify-content-center">
          <div className="headerContent">
            <h1>
              Welcome to <span className="fw-bold">MarketPlace!</span>
            </h1>
            <p className="download">
              India's first products MarketPlace with <br /> advanced tools &
              apps to empower your every trade!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
