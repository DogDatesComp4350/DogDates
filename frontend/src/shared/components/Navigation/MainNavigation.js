import React from "react";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

import "./MainNavigation.css";

export default function MainNavigation() {
  return (
    <MainHeader>
      <h1 className="main-navigation__title">
        <a href="/">
          <span className="material-icons home-icon">pets</span>
          Dog Dates
        </a>
      </h1>
      <nav className="main-navigation__header-nav">
        <NavLinks />
      </nav>
    </MainHeader>
  );
}
