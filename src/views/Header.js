import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactLogo } from "./ReactLogo";
import { Nav, Navbar } from "react-bootstrap";
import Register from "../components/register/Register";
import Login from "../components/login/Login";
import { Link, Prompt, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { authApi } from "../helpers/api";

function Header({ user, updateUser }) {
  const history = useHistory();

  const handleLogin = () => {
    if (localStorage.getItem('token') != null) {
      authApi().delete(`/users/${user.id}`)
    }
    localStorage.removeItem('token');
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

  const handleUnload = (e) => {
    e.preventDefault()
    authApi().delete(`/users/${user.id}`)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }


  useEffect(() => {
    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    }
  }, [])

  return (
    <>
      <Navbar bg="light">
        <Navbar.Brand onClick={() => history.push("/game/dashboard")}>BANG!</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link onClick={() => handleRegister()}>{user == null ? "Register" : "View Profile"}</Nav.Link>
          <Nav.Link onClick={() => handleLogin()}>{user == null ? "Login" : "Logout"}</Nav.Link>
        </Navbar.Collapse>
      </Navbar>
      <br></br>
    </>
  );
};

export default Header;