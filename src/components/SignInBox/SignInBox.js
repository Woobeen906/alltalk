import React, { useContext, useState } from "react";
import "./SignInBox.scss";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "context/ContextProvider";
import { BASE_URL } from "config";
import { useMediaQuery } from "react-responsive";

import Input from "components/Input/Input";
import Space from "components/Space/Space";

const SignInBox = () => {
  const navigate = useNavigate();

  const isMobile = useMediaQuery({
    query: "(min-width:960px)",
  });

  const { state, setLoggedIn } = useContext(Context);

  const [signInData, setSignInData] = useState({ id: "", pw: "" });
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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

  const userProfileImg = () => {
    axios({
      method: "POST",
      url: `${BASE_URL}/util/${signInData.id}/profile`,
      responseType: "blob",
    }).then((res) => {
      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: res.headers["content-type"] })
      );
      localStorage.setItem("userProfile", url);
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
        if (res.data.result === true) {
          navigate("/");
          setLoggedIn();

          localStorage.setItem("login", res.data.result);
          localStorage.setItem("id", signInData.id);

          adminCheck();
          userDataSave();
          userProfileImg();

          setTimeout(() => {
            window.location.reload();
          }, 500);
        } else {
          setError(true);
          // alert("???????????? ??????????????? ??????????????????.");

          if (res.data.result === "error") {
            if (signInData.id === "") setErrorMsg("???????????? ??????????????????");
            else setErrorMsg("??????????????? ??????????????????.");
          } else if (!res.data.result)
            setErrorMsg("????????? ?????? ??????????????? ?????? ??????????????????.");
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="signInBox">
      <div className="signInBox-container">
        <Input
          type="text"
          placeholder="?????????"
          onChange={onChangeId}
          // error={error}
        />
        <Space size={isMobile ? 12 : 8} />
        <Input
          type="password"
          placeholder="????????????"
          onChange={onChangePw}
          // error={error}
        />

        {error && (
          <>
            <Space size={8} />
            <div className="signInBox-errorMsg">{errorMsg}</div>
          </>
        )}
        <Space size={32} />
        <button className="signInBox-signin-btn" onClick={signinBtn}>
          ?????????
        </button>

        <div className="signInBox-btns">
          ?????????????????? |{" "}
          <span onClick={() => navigate("/SignUp")}>????????????</span>
        </div>
      </div>
    </div>
  );
};

export default SignInBox;
