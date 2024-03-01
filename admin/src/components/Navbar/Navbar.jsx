import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar bg-primary sticky-top navbar-dark">
        <div className="container-fluid">
          <NavLink to="/">
            <span className="navbar-brand text-white fw-bold fs-3 m-0 p-0">
              CityWide
            </span>
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
