import React, { useState, useEffect } from "react";
import "./Card.scss";
import Rating from "@mui/material/Rating";
import card3 from "../../assets/free.png";

const Card = ({ item }) => {
  const handleNavigate = (link) => {
    window.open(`${link}`, "_blank");
  };

  const [value, setValue] = useState(item?.rating ?? 0);

  useEffect(() => {
    setValue(item?.rating ?? 0);
  }, [item]);

  return (
    <div className="w-100">
      <div className="card card_img rounded-top-3 w-100">
        <div key={item?.id} className="w-100">
          <div
            className={`card-head p-3 rounded-top-3`}
            style={{ backgroundColor: item?.gradient_1 }}
          >
            <div
              className="position-absolute rectangle"
              style={{ width: "10%" }}
            >
              <img
                src={item?.logo}
                className="card-img-top"
                alt="..."
                style={{ width: "6vw", height: "3vw" }}
              />
            </div>
            <div className="d-flex">
              <div className="w-10 position-relative">
                {item?.free && (
                  <img
                    src={card3}
                    alt="..."
                    style={{
                      width: "5vw",
                      height: "2vw",
                      position: "relative",
                      left: "21vw",
                    }}
                  />
                )}
              </div>
              <div className="w-50 position-relative">
                <img
                  src={item?.illustration}
                  alt="..."
                  style={{
                    width: "8vw",
                    height: "8vw",
                    position: "relative",
                    left: "15vw",
                    bottom: "-2vw",
                  }}
                />
              </div>
            </div>
            <div className="w-100 mt-2 d-flex align-items-center text-white">
              <Rating
                name="simple-controlled"
                value={item?.rating ?? 4}
                readOnly
              />
              {`(${item?.review_count} review)`}
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title text-dark fs-6">{item?.title}</h5>
            <p className="card-text">{item?.description}</p>
            <p className="card-text">
              <span style={{ fontWeight: "bold" }}>Price: {item?.price}</span>
              {item?.price_validity_text}
            </p>
            <p className="card-text">
              Offer Price:{" "}
              <span style={{ color: "#13D726" }}>{item?.offer_price}</span>
              {item?.offer_validity_text}
            </p>
            <div className="buttonsInCard d-flex justify-content-between">
              <a
                href="#"
                className="btn btn-primary"
                onClick={() => handleNavigate(item?.redirection_url)}
              >
                View More Details
              </a>
              <a
                href="#"
                className="btn border border-primary btn-color"
                style={{ color: "#0461D1" }}
              >
                Open an Account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
