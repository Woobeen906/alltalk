import React, { useState } from "react";
import "./Footer.scss";

const Footer = () => {
  const [isFixed, setIsFixed] = useState(false);

  const handlePageChange = (page) => {
    if (page === "some-page") {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  return (
    <footer className={`footer ${isFixed ? "fixed" : ""}`}>
      <div className="footer-title">ALL TALK</div>
      <div className="footer-content">
        <img src={require("assets/imgs/instagram.jpg")} alt="instagram" />
        <p>
          부산광역시 연제구 반송로60, 2층 2사무실 | 대표 박소영 <br />
          pthdud1123@naver.com
        </p>
      </div>
    </footer>
  );
};

export default Footer;
