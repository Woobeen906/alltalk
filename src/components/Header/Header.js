import React from "react";
import "./Header.scss";

import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <header className="Header">
      <div
        className="title"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        ALL TALK
      </div>
      <div className="header-left">
        <nav>
          <ul>
            <Link to="/" style={{ textDecoration: "none" }}>
              <li
                style={
                  location.pathname === "/"
                    ? { color: "#00cb8e" }
                    : { color: "black" }
                }
              >
                콘텐츠
              </li>
            </Link>
            <Link to="story" style={{ textDecoration: "none" }}>
              <li
                style={
                  location.pathname === "/story"
                    ? { color: "#00cb8e" }
                    : { color: "black" }
                }
              >
                스토리
              </li>
            </Link>
            <Link to="writearticle" style={{ textDecoration: "none" }}>
              <li
                style={
                  location.pathname === "/writearticle"
                    ? { color: "#00cb8e" }
                    : { color: "black" }
                }
              >
                기업소개
              </li>
            </Link>
          </ul>
        </nav>
        <span className="login-container">
          <button className="loginBtn" onClick={() => navigate("/SignIn")}>
            로그인
          </button>
          <button className="signUpBtn" onClick={() => navigate("/SignUp")}>
            회원가입
          </button>
        </span>
      </div>
    </header>
  );
};

export default Header;
