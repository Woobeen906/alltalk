import React from "react";
import "./Header.scss";

const Header = () => {
  return (
    <header className="Header">
      <div className="title">ALL TALK</div>
      <nav>
        <ul>
          <li>콘텐츠</li>
          <li>스토리</li>
          <li>기업소개</li>
        </ul>
      </nav>
      <span className="login-container">
        <div className="loginBtn">로그인</div>
        <div className="signUpBtn">회원가입</div>
      </span>
    </header>
  );
};

export default Header;
