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
        <button className="loginBtn">로그인</button>
        <button className="signUpBtn">회원가입</button>
      </span>
    </header>
  );
};

export default Header;
