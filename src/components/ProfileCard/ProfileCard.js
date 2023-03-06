import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileCard.scss";

const ProfileCard = (props) => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState(null);

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
    if (JSON.parse(localStorage.getItem("userdata")))
      setNickname(JSON.parse(localStorage.getItem("userdata")).nickname);
  }, []);
  return (
    <div className="profileCard">
      <div className="profileCard-top">
        <div className="profileCard-profile">
          <img src={require("../../assets/imgs/cat.jpg")} />
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
