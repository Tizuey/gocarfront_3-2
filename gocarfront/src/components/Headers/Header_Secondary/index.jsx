import React, { useContext, useEffect, useState } from "react";

import Logo from "../../../assets/logo_gocar.png";

import "./style.css";

import { Navbar } from "react-bootstrap";

import { Link } from "react-router-dom";

import { SignOut } from "phosphor-react";

function SecondaryHeader() {
  const [autenticacao, setAutenticacao] = useState("");

  useEffect(() => {
  }, [autenticacao]);

  function logout() {
    localStorage.clear();
    setAutenticacao("logout");
  }

  const name = localStorage.getItem('name');
  const lastname = localStorage.getItem('lastname');

  return (
    <>
      <Navbar className="navbar">
        <Navbar.Brand>
          <Link to="/">
            <img
              src={Logo}
              width="100"
              height="30"
              className="align-top ml-4"
              alt="LOGO"
            />
          </Link>
        </Navbar.Brand>

        <div className="user_autenticado">
          <div className="user_options">
            <div className="welcome_text">
              <h5>Olá, {name} {lastname} </h5>
            </div>
            <button
              className="logout"
              onClick={() => {
                logout();
              }}
            >
              {" "}
              <a href="/">
                <SignOut size={35} color="#F55E00" />
              </a>{" "}
            </button>
            <button className="perfil"> <div className="letters"><h5>{name[0]}&nbsp;{lastname[0]}</h5></div> </button>
          </div>
        </div>
      </Navbar>
    </>
  );
}

export default SecondaryHeader;