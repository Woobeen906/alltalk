import React from "react";
import "./WriteHeader.scss";

import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const WriteHeader = (props) => {
  const { uploadBtn, saveBtn, setModal } = props;

  const isMobile = useMediaQuery({
    query: "(min-width:960px)",
  });

  const navigate = useNavigate();

  return (
    <header
      className="WriteHeader"
      style={{
        transition: "all 0.5s",
        borderBottom: "0.1px solid #EEF1F4",
      }}
    >
      <div
        className="title"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        ALL TALK
      </div>

      {isMobile ? (
        <div className="header-right">
          <span className="login-container">
            <button className="loadBtn" onClick={setModal}>
              불러오기
            </button>
            <button className="loginBtn" onClick={saveBtn}>
              임시저장
            </button>
            <button className="uploadBtn" onClick={uploadBtn}>
              업로드
            </button>
          </span>
        </div>
      ) : (
        <div className="header-right">
          <span className="login-container">
            <button className="uploadBtn" onClick={uploadBtn}>
              업로드
            </button>

            <div className="writeheader-mobile-bottom">
              <button className="loadBtn" onClick={setModal}>
                불러오기
              </button>
              <button className="loginBtn" onClick={saveBtn}>
                임시저장
              </button>
            </div>
          </span>
        </div>
      )}
    </header>
  );
};

export default WriteHeader;
