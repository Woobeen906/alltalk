import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMediaQuery } from "react-responsive";

import "./MypageProfile.scss";

const MypageProfile = (props) => {
  const navigate = useNavigate();

  const { nickname, introduce, profile } = props.item;
  const isMobile = useMediaQuery({
    query: "(min-width:960px)",
  });

  const [profileImg, setProfileImg] = useState();

  const loadImage = () => {
    axios({
      method: "POST",
      url: profile,
      responseType: "blob",
    }).then((res) => {
      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: res.headers["content-type"] })
      );

      setProfileImg(url);
    });
  };

  useEffect(() => {
    loadImage();
  }, []);

  return (
    <div className="mypageProfile">
      <div className="mypageProfile-info">
        <img src={profileImg} alt="userImg" />

        {isMobile ? (
          <>
            <div className="mypageProfile-nickname">{nickname}</div>
            <button
              className="mypageProfile-profilesetting"
              onClick={() => navigate("/ProfileSetting")}
            >
              프로필 설정
            </button>
          </>
        ) : (
          <div className="mypageProfile-mobile">
            <div className="mypageProfile-nickname">{nickname}</div>
            <button
              className="mypageProfile-profilesetting"
              onClick={() => navigate("/ProfileSetting")}
            >
              프로필 설정 >
            </button>
          </div>
        )}
      </div>
      {introduce && (
        <div className="mypageProfile-description">{introduce}</div>
      )}
    </div>
  );
};

export default MypageProfile;
