import React, { useState } from "react";
import styled from "styled-components";
import { ReactLogo } from "./ReactLogo";
import { Nav, Navbar } from "react-bootstrap";
import Register from "../components/register/Register";
import Login from "../components/login/Login";
import { Link, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

function Header({ user, updateUser }) {
  const history = useHistory();

  const handleLogin = () => {
    updateUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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


  return (

    <Navbar bg="light">
      <Navbar.Brand href="#home">BANG!</Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Nav.Link onClick={() => handleRegister()}>{user == null ? "Register" : "View Profile"}</Nav.Link>
        <Nav.Link onClick={() => handleLogin()}>{user == null ? "Login" : "Logout"}</Nav.Link>
      </Navbar.Collapse>
    </Navbar>

  );
};

export default Header;