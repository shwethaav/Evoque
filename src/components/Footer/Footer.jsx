import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div>
      <div className="footer">
        <h1>
          Join the <span className="fw-bold">family</span> today!
        </h1>
        <h5>
          Take advantage of the various products to build your own <br />
          customized trading strategies.
        </h5>
        <div className="button">
          <a id="download" href="javascript:void(0)" aria-label="Open New Account">Open New Account</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
