import React, { useEffect, useState } from "react";
import "./ProfileCard.scss";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "config";

const ProfileCard = (props) => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState(null);
  const [profileImg, setProfileImg] = useState();

  const Image = () => {
    axios({
      method: "POST",
      url: `${BASE_URL}/util/${localStorage.getItem("id")}/profile`,
      responseType: "blob",
    }).then((res) => {
      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: res.headers["content-type"] })
      );
      setProfileImg(url);
    });
  };

  const onClickLogout = () => {
    window.location.reload();
    localStorage.clear();
    props.onHandleModal();
    navigate("/");
  };

  const onClickProfileSetting = () => {
    props.onHandleModal();
    navigate("/ProfileSetting");
  };

  useEffect(() => {
    Image();
    if (JSON.parse(localStorage.getItem("userdata")))
      setNickname(JSON.parse(localStorage.getItem("userdata")).nickname);
  }, []);

  return (
    <div className="profileCard">
      <div className="profileCard-top">
        <div className="profileCard-profile">
          {profileImg && <img src={profileImg} />}
        </div>
        <div className="profileCard-text">
          {nickname}
          <button
            onClick={() => onClickProfileSetting()}
          >{`프로필 설정>`}</button>
        </div>
      </div>
      <div className="profileCard-bottom">
        <ul>
          <li onClick={() => navigate("/Mypage")}>마이페이지</li>
          <li onClick={() => navigate("/WriteArticle")}>새 스토리 작성</li>
          <li style={{ color: "#FF4C4C" }} onClick={() => onClickLogout()}>
            로그아웃
          </li>
        </ul>
      </div>
    </div>
  );
};
export default ProfileCard;
