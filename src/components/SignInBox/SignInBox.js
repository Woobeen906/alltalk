import Input from "components/Input/Input";
import Space from "components/Space/Space";
import React from "react";
import "./SignInBox.scss";

const SignInBox = () => {
  return (
    <div className="signInBox">
      <div className="signInBox-container">
        <Input type="text" placeholder="아이디" />
        <Space size={12} />
        <Input type="password" placeholder="비밀번호" />
        <Space size={32} />
        <button className="signInBox-signin-btn">로그인</button>

        <div className="signInBox-btns">비밀번호찾기 | 회원가입</div>
      </div>
    </div>
  );
};

export default SignInBox;
