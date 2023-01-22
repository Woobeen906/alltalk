import React from "react";
import "./Header.scss";

const Header = () => {
  return (
    <header className="Header">
      <span className="title">ALL TALK</span>
      <nav>
        <ul>
          <li>콘텐츠</li>
          <li>스토리</li>
          <li>기업소개</li>
        </ul>
      </nav>

      <span className="login-container"></span>
    </header>
  );
};

export default Header;
