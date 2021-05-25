import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactLogo } from "./ReactLogo";
import { Nav, Navbar } from "react-bootstrap";
import Register from "../components/register/Register";
import Login from "../components/login/Login";
import { Link, Prompt, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { authApi } from "../helpers/api";
import User from "../components/shared/models/User";

function Header({ user, updateUser }) {
  const history = useHistory();

  const handleLoginLogout = () => {
    if (localStorage.getItem('user') != null) {
      // Logout
      authApi().put(`/users/${user.id}`, { "status": "OFFLINE" })
    }
    localStorage.removeItem('user');
    updateUser(null);
    history.push("/login");
  }

  const handleRegister = () => {
    if (user == null) {
      history.push("/register");
    } else {
      // TODO fetch actual id from user
      history.push("/game/dashboard/1");
    }

  }
//TODO: also remove 'player_table from the local storage
  // this makes sure that a user is automatically logged out when they close the tab/window
  useEffect(() => {
    const handleUnload = (e) => {
      authApi().put(`/users/${user.id}`, { "status": "OFFLINE" })
    }
    window.addEventListener('beforeunload', handleUnload)

    return () => {
      window.removeEventListener('beforeunload', handleUnload);

    }
  }, [user])


  // runs when website opened first
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData == null) {
      return
    }
    const currentUser = new User(userData);

    try {
      // try changing the online status
      authApi().put(`/users/${currentUser.id}`, { "status": "ONLINE" });
      updateUser(currentUser);
    } catch (error) {
      // if failed token is invalid and user is not logged in
      localStorage.removeItem("user");
    }
  }, [])





  return (
    <>
      <Navbar bg="s">
        <Navbar.Brand onClick={() => history.push("/game/dashboard")}>BANG!</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link
              className="navbar-brand"
              onClick={() => handleRegister()}>{user == null ? "Register" : ""}
          </Nav.Link>
          <Nav.Link
              className="navbar-brand"
              onClick={() => handleLoginLogout()}>{user == null ? "Login" : "Logout"}
          </Nav.Link>
        </Navbar.Collapse>
      </Navbar>
      <br></br>
    </>
  );
};

export default Header;