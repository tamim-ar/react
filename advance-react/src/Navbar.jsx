import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "text-danger" : "")}
      >
        Home
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) => (isActive ? "text-danger" : "")}
      >
        LogIn
      </NavLink>
      <NavLink
        to="/registration"
        className={({ isActive }) => (isActive ? "text-danger" : "")}
      >
        Registration
      </NavLink>
      <NavLink
        to="/user"
        className={({ isActive }) => (isActive ? "text-danger" : "")}
      >
        User
      </NavLink>
    </div>
  );
}
