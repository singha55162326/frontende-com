import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import blogo from "../../public/images/logo/b-cart.jpg";
import { logout } from "../Redux/Actions/userActions";

import CartScreen from "../screens/CartScreen";
import HomeScreen from "../screens/HomeScreen";
import { Search } from "@mui/icons-material";

const suggestions = ["ເສື້ອ", "ໂສ້ງ", "ເກີບ" /* Add more keywords */];

const Header = () => {
  const [keyword, setKeyword] = useState("");
  const [suggestedKeywords, setSuggestedKeywords] = useState([]);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
    setSuggestedKeywords([]); // Clear suggestions
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setKeyword(inputValue);
    const filteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSuggestedKeywords(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setKeyword(suggestion);
    navigate(`/search/${suggestion}`);
    setSuggestedKeywords([]); // Clear suggestions
  };

  return (
    <div>
      {/* <div className="Announcement">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex-align-items-center display-none">
              <p>+85620 55 55 55 55</p>
              <p>info@thammavong.com</p>
            </div>
            <div className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-start">
              <Link to="#">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-linkedin-in"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-youtube"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-pinterest-p"></i>
              </Link>
            </div>
          </div>
        </div>
      </div> */}

      {/* Header */}
      <div className="header">
        <div className="container">
          {/* MOBILE HEADER */}
          <div className="mobile-header">
            <div className="container">
              <div className="row">
                <div className="col-6 d-flex align-items-center">
                  <Link className="navbar-brand" to="/">
                    <img src={blogo} alt="logo" />
                  </Link>
                </div>

                <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                  {userInfo ? (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="fas fa-user"></i>
                      </button>

                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/profile">
                          ໂປຣຟາຍ
                        </Link>

                        <Link
                          className="dropdown-item"
                          to="#"
                          onClick={logoutHandler}
                        >
                          ອອກຈາກລະບົບ
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="fas fa-user"></i>
                      </button>

                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/login">
                          ເຂົ້າສູ່ລະບົບ
                        </Link>

                        <Link className="dropdown-item" to="/register">
                          ສະໝັກສະມາຊິກ
                        </Link>
                      </div>
                    </div>
                  )}
                  <Link to="/cart" className="cart-mobile-icon">
                    <i className="fas fa-shopping-bag"></i>
                    <span className="badge">{cartItems.length}</span>
                  </Link>
                </div>

                <div className="col-12 d-flex align-items-center">
                  <form onSubmit={submitHandler} className="input-group">
                    <input
                      type="search"
                      className="form-control rounded search"
                      placeholder="Search"
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                      ຄົ້ນຫາ
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* PC HEADER */}
          <div className="pc-header">
            <div className="row">
              <div className="col-md-3 col-4 d-flex align-items-center">
                <Link to="/" className="navbar-brand" href="/">
                  <img src={blogo} alt="logo" />
                </Link>
              </div>

              <div className="col-md-6 col-8 d-flex align-items-center">
                <form onSubmit={submitHandler} className="input-group">
                  <input
                    type="search"
                    className="form-control rounded search"
                    placeholder="Search"
                    value={keyword}
                    onChange={handleInputChange}
                  />
                  <button type="submit" className="search-button">
                    ຄົ້ນຫາ
                  </button>
                </form>
                {suggestedKeywords.length > 0 && (
                  <ul className="suggestions">
                    {suggestedKeywords.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                {userInfo ? (
                  <div className="btn-group">
                    <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Hi, {userInfo.name}
                    </button>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/profile">
                        ໂປຣຟາຍ
                      </Link>

                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={logoutHandler}
                      >
                        ອອກຈາກລະບົບ
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link to="/register">ສະໝັກສະມາຊິກ</Link>
                    <Link to="/login">ເຂົ້າສູ່ລະບົບ</Link>
                  </>
                )}

                <Link to="/cart/:id">
                  <i className="fas fa-shopping-bag"></i>
                  <span className="badge">{cartItems.length}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
