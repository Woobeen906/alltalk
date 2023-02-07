import React from "react";
import "./SignUpBox.scss";

const SignUpBox = () => {
  return (
    <div className="signUpBox">
      <div className="signUpBox-title">ALL TALK</div>
      <div className="signUpBox-content">
        <div className="signUpBox-description">
          콘텐츠소개 콘텐츠소개 웹사이트 소개 문구 두 줄 정도 콘텐츠소개
        </div>
        <div className="signUpBox-btn">
          <button>회원가입</button>
        </div>
      </div>
    </div>
  );
};

export default SignUpBox;
