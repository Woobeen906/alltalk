import React from "react";
import { useNavigate } from "react-router-dom";

const WriteHeader = (props) => {
  const { uploadBtn, saveBtn } = props;
  const navigate = useNavigate();
  return (
    <header
      className="Header"
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

      <div className="header-left">
        <span className="login-container">
          <button className="loadBtn">불러오기</button>
          <button className="loginBtn" onClick={saveBtn}>
            임시저장
          </button>
          <button className="signUpBtn" onClick={uploadBtn}>
            업로드
          </button>
        </span>
      </div>
    </header>
  );
};

export default WriteHeader;
