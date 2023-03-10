import React, { useState, forwardRef } from "react";
import "./Scene1.scss";

import { useMediaQuery } from "react-responsive";

import image1 from "assets/imgs/Scene1/Scene1_1.jpeg";
import image2 from "assets/imgs/Scene1/Scene1_2.jpeg";
import image3 from "assets/imgs/Scene1/Scene1_3.jpeg";

const Scene1 = forwardRef((props, ref) => {
  const { animation } = props;

  const isMobile = useMediaQuery({
    query: "(min-width:960px)",
  });

  const [page, setPage] = useState([image1, image2, image3]);

  const [currentPage, setCurrentPage] = useState(0);

  const nextBtn = () => {
    if (currentPage > -200) setCurrentPage(currentPage - 100);
  };

  const prevBtn = () => {
    if (currentPage < 0) setCurrentPage(currentPage + 100);
  };

  return (
    <div className="scene1" ref={ref}>
      <div
        className="scene1-images"
        style={{ transform: `translateX(${currentPage}vw)` }}
      >
        <div
          style={{
            backgroundImage: `url(${page[0]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div
          style={{
            backgroundImage: `url(${page[1]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div
          style={{
            backgroundImage: `url(${page[2]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
      <div className="scene1-textbox">
        <div className="scene1-title">환경에 AI를 더하다</div>
        <div className="scene1-subtitle">
          당신이 생활하는 환경을 늘 아름답게
        </div>
        <div className="scene1-progressbar-box">
          <button onClick={prevBtn}>
            <img
              src={require("../../../assets/imgs/arrowLeft.png")}
              alt={"arrowLeft"}
            />
          </button>
          <ul className="scene1-progressbars">
            <li
              className={`scene1-progressbar ${
                currentPage <= 0 && "scene1-current"
              }`}
            ></li>
            <li
              className={`scene1-progressbar ${
                currentPage <= -100 && "scene1-current"
              }`}
            ></li>
            <li
              className={`scene1-progressbar ${
                currentPage <= -200 && "scene1-current"
              }`}
            ></li>
          </ul>

          <button onClick={nextBtn}>
            <img
              src={require("../../../assets/imgs/arrowRight.png")}
              alt={"arrowLeft"}
            />
          </button>
        </div>
      </div>
      <div className="scene1-scroll-box">
        <div className="scene1-scrollani">Scroll Down</div>
        <div className="scene1-scrollimg"></div>
      </div>
    </div>
  );
});

export default Scene1;
