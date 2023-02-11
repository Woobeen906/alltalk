import Space from "components/Space/Space";
import React from "react";
import "./StoryDetailUserInfo.scss";

const StoryDetailUserInfo = () => {
  return (
    <div className="storyDetailUserInfo">
      <img src={require("../../assets/imgs/cat.jpg")} alt={"userprofile"} />
      <div className="storyDetailUserInfo-user">
        닉네임
        <Space size={8} />
        <button>프로필 수정</button>
      </div>
      <div className="storyDetailUserInfo-text">
        자기소개 멘트가 들어가는 자리입니다. 자기소개 멘트가 들어가는
        자리입니다. 자기소개 멘트가 들어가는 자리입니다. 자기소개 멘트가
        들어가는 자리입니다.
      </div>
    </div>
  );
};

export default StoryDetailUserInfo;
