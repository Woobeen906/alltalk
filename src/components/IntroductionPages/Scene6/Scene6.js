import React, { forwardRef } from "react";
import "./Scene6.scss";

import { useMediaQuery } from "react-responsive";

const Scene6 = forwardRef((props, ref) => {
  const isMobile = useMediaQuery({
    query: "(min-width:960px)",
  });
  return (
    <div className="scene6" ref={ref}>
      <div className="scene6-title">
        최선의 서비스 제공을 위해
        <br /> 시도하고, 열정을 가지고, 책임을 가지며 문제를 해결하는
        <br /> <span>핵심 키</span>가 되어드리겠습니다.
      </div>
      <div className="scene6-image">
        {isMobile ? (
          <img
            src={require("../../../assets/imgs/Scene6/Scene6Img.jpg")}
            alt="scene6img"
          />
        ) : (
          <img
            src={require("../../../assets/imgs/Scene6/Scene6MobileImg.png")}
            alt="scene6MobileImg"
          />
        )}
      </div>
      <button
        className="scene6-btn"
        onClick={() => {
          window.open("https://wealltalk.co.kr/");
        }}
      >
        wealltalk 둘러보기
      </button>
    </div>
  );
});
export default Scene6;
