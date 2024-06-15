import React, { useState, useEffect, useCallback } from "react";
import "./Main.scss";
import Card from "../../components/Card/Card";
import { IoIosSearch } from "react-icons/io";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";

const Main = () => {
  const token =
    "eyJhbGciOiJIUzUxMiIsImlhdCI6MTYwODEwMDI4MCwiZXhwIjoxNjE1ODc2MjgwfQ.eyJ0eXBlIjozLCJpZCI6MTQ5MzMsImNyZWF0ZWQiOiIyMDIwLTEyLTE2IDA2OjMxOjIwLjczMTk2NiJ9.Ef001xBUX_ZPsgvGWCou9sUa6Q2BV9jvPWZZsnwE8qB3_IDTGaSNV0d0lmcuWab2FwEUQ3GouA9LVdd7ExmkvQ";
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("1");
  const [filter, setFilter] = useState({developer: "All",rating: "All",appType: "All"});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);

  const handleSelectPage = () => {
    setPage(page + 1);
  };
  const moveRight = () => {
    setPage(page + 1);
  };

  const moveLeft = () => {
    setPage(page - 1);
  };

  useEffect(() => {
    fetch(
      "https://18ebbuf8l8.execute-api.ap-south-1.amazonaws.com/demo/api/v3/user/marketplace/filter-data"
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (type, value) => {
    console.log(type, value);
    let updatedFilter = { ...filter, [type]: value };
    setFilter(updatedFilter);
  };

  
  const onSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const url =
        "https://18ebbuf8l8.execute-api.ap-south-1.amazonaws.com/demo/api/v3/user/marketplace/search";
      const payload = {
        page_num: page,
        text: searchText,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Token": token,
        },
        body: JSON.stringify(payload),
      });
      const { data, message } = await response.json();
      if (response.ok) {
        setList(data);
        setLoading(false);
      } else {
        console.error("Error fetching products:", message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    } finally {
      setIsSubmitting(false);
    }
  }, [token, page, searchText]);

  //Product List With Filter

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchText.trim()) {
        onSubmit();
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText, page, onSubmit]);

  const handleSorting = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://18ebbuf8l8.execute-api.ap-south-1.amazonaws.com/demo/api/v3/user/marketplace/filter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Token": token,
          },
          body: JSON.stringify({
            page_num: page,
            filter_id: 2,
            segment_id: 1,
            price_type: filter?.developer === "All" ? null : filter?.developer,
            rating_by: filter?.rating === "All" ? null : filter?.rating,
            application_type:
              filter?.appType === "All" ? null : filter?.appType,
            min_price_limit: 0,
            max_price_limit: 29500000,
            min_investment_limit: 0,
            max_investment_limit: 100000000,
            sort_by: parseInt(sortOption),
          }),
        }
      );
      const { status_code, data, message } = await response.json();
      if (status_code === 200) {
        setList(data);
        setLoading(false);
      } else {
        console.error("Error fetching products:", message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  }, [token, page, filter, sortOption]);

   useEffect(() => {
    handleSorting();
  }, [handleSorting]); 

  return (
    <div>
      <Header />
      {loading && <Loader />}
      <div className="main d-flex justify-content-center ">
        <div className="main_container row col-10">
          <div className="main_container_left  col-sm-6 col-md-4 col-lg-3 px-3">
            <div className="main_container_left_search">
              <div className="main_container_left_search_field w-75 ">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                  }}
                  className="search border border-2 rounded w-100 d-flex align-items-center justify-content-around py-1 px-2"
                >
                  <IoIosSearch />
                  <input
                    className="me-2 border-0 w-75 fs-6"
                    type="search"
                    placeholder="Search For products"
                    aria-label="Search"
                    name="searchText"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    disabled={isSubmitting}
                  />
                </form>
              </div>
            </div>
            <div className="main_container_left_develop">
              <div className="main_container_left_develop_heading">
                <h3>Price Type</h3>
                <div className="main_container_left_develop_heading_buttons">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="developer"
                      checked={filter.developer === null}
                      onChange={() => handleFilterChange("developer", null)}
                    />
                    <label className="form-check-label" for="flexRadioDefault1">
                      All
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="developer"
                      checked={filter.developer === 1}
                      onChange={() => handleFilterChange("developer", 1)}
                    />
                    <label className="form-check-label" for="flexRadioDefault2">
                      Trail Access
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="developer"
                      checked={filter.developer === 2}
                      onChange={() => handleFilterChange("developer", 2)}
                    />
                    <label className="form-check-label" for="flexRadioDefault2">
                      Free
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="main_container_left_rating">
              <div className="main_container_left_rating_heading">
                <h3>Rating by</h3>
                <div className="main_container_left_rating_heading_buttons d-flex align-item-center">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="rating"
                      checked={filter.rating === 5}
                      onChange={() => handleFilterChange("rating", 5)}
                    />
                    <label
                      className="form-check-label ml-3"
                      for="flexRadioDefault1"
                    >
                      All
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="rating"
                      checked={filter.rating === 4}
                      onChange={() => handleFilterChange("rating", 4)}
                    />
                    <label
                      className="custom-control-label ml-3"
                      htmlFor="four-and-above"
                    >
                      <span className="rating-stars">
                        <i className="bi bi-star-fill ml-3"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star"></i>
                      </span>
                      & above
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="rating"
                      checked={filter.rating === 3}
                      onChange={() => handleFilterChange("rating", 3)}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="three-and-above"
                    >
                      <span className="rating-stars">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star"></i>
                        <i className="bi bi-star"></i>
                      </span>
                      & above
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="rating"
                      checked={filter.rating === 2}
                      onChange={() => handleFilterChange("rating", 2)}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="two-and-above"
                    >
                      <span className="rating-stars">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star"></i>
                        <i className="bi bi-star"></i>
                        <i className="bi bi-star"></i>
                      </span>
                      & above
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="rating"
                      checked={filter.rating === 1}
                      onChange={() => handleFilterChange("rating", 1)}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="one-and-above"
                    >
                      <span className="rating-stars">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star"></i>
                        <i className="bi bi-star"></i>
                        <i className="bi bi-star"></i>
                        <i className="bi bi-star"></i>
                      </span>
                      & above
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="main_container_left_rating">
              <div className="main_container_left_rating_heading">
                <h3>Application type</h3>
                <div className="main_container_left_rating_heading_buttons">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="appType"
                      checked={filter.appType === null}
                      onChange={() => handleFilterChange("appType", null)}
                    />
                    <label className="form-check-label" for="flexRadioDefault1">
                      All
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="appType"
                      checked={filter.appType === 1}
                      onChange={() => handleFilterChange("appType", 1)}
                    />
                    <label className="form-check-label" for="flexRadioDefault2">
                      Web based applications
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="appType"
                      checked={filter.appType === 2}
                      onChange={() => handleFilterChange("appType", 2)}
                    />
                    <label className="form-check-label" for="flexRadioDefault2">
                      Mobile Applications
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main_container_right p-0 row col-12 col-md-8 col-lg-9 d-flex justify-content-end">
            <div className="col-md-12 row gap-4 justify-content-center justify-content-md-end">
              <div className="col-12 col-sm-10 d-flex justify-content-end">
                <div className="col-12 col-sm-8 col-lg-8 col-xxl-5 d-flex align-items-center justify-content-end">
                  <span
                    className="col-3 col-md-3 col-lg-3 text-center"
                    style={{ fontWeight: "bold" }}
                  >
                    Sort by:
                  </span>
                  <div className="dropdown">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                    >
                      <option value="1">Newly Added</option>
                      <option value="2">Top Rated</option>
                      <option value="3">Top Performing</option>
                      <option value="4">Name</option>
                      <option value="5">Price Low to High</option>
                      <option value="6">Price High to Low</option>
                    </select>
                  </div>
                </div>
                <div className="product-list"></div>
              </div>
              <div className="container">
                <div className="row">
                  {list?.products?.length === 0 ? (
                    <div className="col-12 text-center">
                      No Data Found Click on left button in pagination.
                    </div>
                  ) : (
                    list?.products?.map((item) => (
                      <div className="col-12 col-md-6 mb-4">
                        <div className="w-100 d-flex flex-wrap">
                          <Card item={item} />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-4 "></div>
                <div className="col-4 d-flex justify-content-center">
                  <div className="pagination d-flex justify-content-between my-5">
                    <div>
                      <button
                        type="button"
                        className="btn"
                        onClick={moveLeft}
                        disabled={page === 1}
                      >
                        &lt;
                      </button>
                    </div>
                    <div onClick={() => handleSelectPage()}>
                      <button
                        type="button"
                        className="btn d-flex justify-content-center align-items-center"
                      >
                        <p className="m-0">{page}</p>
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn"
                        onClick={moveRight}
                        disabled={list?.products?.length === 0}
                      >
                        &gt;
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
