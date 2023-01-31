import React from "react";
import "./Header.scss";

import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="Header">
      <div className="title">ALL TALK</div>
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
          <Link to="" style={{ textDecoration: "none" }}>
            <li
              style={
                location.pathname === "/?"
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
        <button className="loginBtn">로그인</button>
        <button className="signUpBtn">회원가입</button>
      </span>
    </header>
  );
};

export default Header;
