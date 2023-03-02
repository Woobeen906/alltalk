import React, { useEffect, useState } from "react";
import Space from "components/Space/Space";

import axios from "axios";
import "./StoryDetailUserInfo.scss";

const StoryDetailUserInfo = (props) => {
  const { user } = props;

  const [profileImg, setProfileImg] = useState();

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
  }, []);
  return (
    <div className="storyDetailUserInfo">
      <img src={profileImg} alt={""} />
      <div className="storyDetailUserInfo-user">
        {user.nickname}
        <Space size={8} />
        <button>프로필 수정</button>
      </div>
      <div className="storyDetailUserInfo-text">{user.introduce}</div>
    </div>
  );
};

export default StoryDetailUserInfo;
