import React, { useContext, useState } from "react";
import "./SignInBox.scss";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "context/ContextProvider";
import { BASE_URL } from "config";

import Input from "components/Input/Input";
import Space from "components/Space/Space";

const SignInBox = () => {
  const navigate = useNavigate();
  const { state, setLoggedIn } = useContext(Context);

  const [signInData, setSignInData] = useState({ id: "", pw: "" });
  const onChangeId = (e) => {
    setSignInData({ ...signInData, id: e.target.value });
  };
  const onChangePw = (e) => {
    setSignInData({ ...signInData, pw: e.target.value });
  };

  const adminCheck = () => {
    const frm = new FormData();
    frm.append("id", signInData.id);
    try {
      axios({
        method: "POST",
        url: `${BASE_URL}/util/admin`,
        data: frm,
      }).then((res) => {
        if (res.data.result) {
          localStorage.setItem("admin", res.data.result);
        }
      });
    } catch (e) {}
  };

  const userDataSave = () => {
    const frm = new FormData();
    frm.append("id", signInData.id);
    axios({
      method: "POST",
      url: `${BASE_URL}/my/user`,
      data: frm,
    }).then((res) => {
      localStorage.setItem("userdata", JSON.stringify(res.data));
    });
  };

  const signinBtn = async () => {
    try {
      const frm = new FormData();
      frm.append("id", signInData.id);
      frm.append("pw", signInData.pw);

      await axios({
        method: "POST",
        url: `${BASE_URL}/signin`,
        data: frm,
      }).then((res) => {
        if (res.data.result) {
          navigate("/");
          setLoggedIn();

          localStorage.setItem("login", res.data.result);
          localStorage.setItem("id", signInData.id);
          adminCheck();
          userDataSave();
        } else {
          alert("아이디와 비밀번호를 확인해주세요.");
        }
      });
      // .catch((e) => alert("아이디와 비밀번호를 확인해주세요."));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="signInBox">
      <div className="signInBox-container">
        <Input type="text" placeholder="아이디" onChange={onChangeId} />
        <Space size={12} />
        <Input type="password" placeholder="비밀번호" onChange={onChangePw} />
        <Space size={32} />
        <button className="signInBox-signin-btn" onClick={signinBtn}>
          로그인
        </button>

        <div className="signInBox-btns">
          비밀번호찾기 |{" "}
          <span onClick={() => navigate("/SignUp")}>회원가입</span>
        </div>
      </div>
    </div>
  );
};

export default SignInBox;
