import React from "react";
import "./SignUp.scss";

import { useMediaQuery } from "react-responsive";

import {
  SignInKaKao,
  SignInNaver,
  SignInGoogle,
} from "components/SignInBtns/SignInBtns";
import SignUpBox from "components/SignUpBox/SignUpBox";
import Space from "components/Space/Space";

const SignUp = () => {
  const isMobile = useMediaQuery({
    query: "(min-width:960px)",
  });
  return (
    <div className="signUp">
      <Space size={isMobile ? 99 : 79} />
      <SignUpBox />
      {/* <div className="signUp-sns">SNS로 간편하게 회원가입</div>
      <div className="signUp-socialBtns">
        <SignInKaKao />
        <Space size={10} />
        <SignInNaver />
        <Space size={10} />
        <SignInGoogle />
      </div> */}
    </div>
  );
};

export default SignUp;
