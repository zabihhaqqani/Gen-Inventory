import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const getActiveStyle = ({ isActive }) =>
    isActive ? "isActive" : "notActive";

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  return (
    <nav>
      <h3>GenInventory</h3>
      <div className="menu-icon" onClick={toggleMenu}>
        <i className={`fa-solid fa-${isOpen ? "x" : "bars"} fa-lg`}></i>
      </div>

      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/" className={getActiveStyle}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/inventory-management" className={getActiveStyle}>
            Inventory
          </NavLink>
        </li>
        <li>
          <NavLink to="/sales" className={getActiveStyle}>
            Sales
          </NavLink>
        </li>
        <li>
          <NavLink to="/reports" className={getActiveStyle}>
            Reports and Analytics
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
