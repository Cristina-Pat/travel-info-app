import { Link, useLocation } from "react-router-dom";
import logo from "/src/assets/travelInfoLogo.svg";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import authService from "../services/auth.service.js"


const NavRibbon = ({favouriteLocations}) => {
 
  let favouritesMenuItem;

  let profileMenuItem;

  let location = useLocation();

  let [inputValue, setInputValue] = useState("");
  let navigate = useNavigate();

  const user  = authService.getUser();

  function handleOnClick(e) {
    console.log('navigating to ', inputValue);
    navigate("/weather?location=" + inputValue);
  }

  let handleChange = function (e) {
    setInputValue(e.target.value);
  };

  let handleLogout = function (e) {
    authService.logout();
    navigate(`/ `);
  }

  if(user && favouriteLocations.length > 0) {
    const locationLinks = favouriteLocations.map(data =>
        <Link key={data} className="dropdown-item" to={"/weather?location=" + data}>
          {data}
        </Link>);

    favouritesMenuItem = <li className="nav-item dropdown">
        <div className="btn-group">
          <Link
            className="btn btn-outline-dark border-0"
            to="/favourites"
          >
            My Saved Locations
          </Link>
          <button
            type="button"
            className="btn btn-outline-dark border-0 dropdown-toggle dropdown-toggle-split"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span className="visually-hidden">Toggle Dropdown</span>
          </button>
          <div className="dropdown-menu">
            {locationLinks}
          </div>
        </div>
      </li>
  } else {
    favouritesMenuItem = <></>
  }

  if (user) {
    profileMenuItem = (
      <li className="nav-item dropdown">
        <div className="btn-group">
          <Link
            className="btn btn-outline-dark border-0"
            to="/profile"
          >
            Profile
          </Link>
          <button
            type="button"
            className="btn btn-outline-dark border-0 dropdown-toggle dropdown-toggle-split"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span className="visually-hidden">Toggle Dropdown</span>
          </button>
          <div className="dropdown-menu">
            <Link className="dropdown-item" to="/changepassword">
              Change Password
            </Link>
            <Link className="dropdown-item" to="/logout" onClick={handleLogout}>
              Logout
            </Link>
          </div>
        </div>
      </li>
    );
  } else {
    profileMenuItem = 
    <>
      <li className="nav-item">
        <Link className="nav-link active" to="/login">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link active" to="/register">
          Register
        </Link>
      </li>
    </>
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand">
            <img
              className="img-fluid"
              src={logo}
              width="40"
              height="40"
              alt="Travel Info Logo"
            />
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
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              {favouritesMenuItem}
              {profileMenuItem}
            </ul>
            {/* don't render the search on home page -  hook??? */}

            {location.pathname != "/" && <div className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleChange}
              />
              <div className="btn btn-outline-success" onClick={handleOnClick}>
                Search
              </div>
            </div>}
          </div>

        </div>
      </nav>
    </header>
  );
};

NavRibbon.propTypes = {
  favouriteLocations : PropTypes.array.isRequired,
}

export default NavRibbon;
