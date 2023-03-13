import React, { useEffect, useState } from "react";
import "./StoryDetailUserInfo.scss";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import Space from "components/Space/Space";

const StoryDetailUserInfo = (props) => {
  const { user } = props;
  const navigate = useNavigate();

  const [profileImg, setProfileImg] = useState();
  const [nickname, setNickname] = useState(null);
  const [mount, setMount] = useState(false);

  const loadImg = async () => {
    await axios({
      method: "POST",
      url: user.profile,
      responseType: "blob",
    }).then((res) => {
      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: res.headers["content-type"] })
      );

      setProfileImg(url);
    });
  };
  useEffect(() => {
    loadImg();
  }, [mount]);

  useEffect(() => {
    setTimeout(() => {
      setMount(true);
    }, 500);
    if (JSON.parse(localStorage.getItem("userdata")))
      setNickname(JSON.parse(localStorage.getItem("userdata")).nickname);
  }, []);
  return (
    <div className="storyDetailUserInfo">
      {profileImg && <img src={profileImg} alt={""} />}
      <div className="storyDetailUserInfo-user">
        {user.nickname}
        <Space size={8} />
        {nickname === user.nickname && (
          <button onClick={() => navigate("/ProfileSetting")}>
            프로필 수정
          </button>
        )}
      </div>
      <div className="storyDetailUserInfo-text">{user.introduce}</div>
    </div>
  );
};

export default StoryDetailUserInfo;
