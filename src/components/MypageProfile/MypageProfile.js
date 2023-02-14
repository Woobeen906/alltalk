import React from "react";
import "./MypageProfile.scss";

const MypageProfile = () => {
  return (
    <div className="mypageProfile">
      <img src={require("../../assets/imgs/cat.jpg")} />
      <div className="mypageProfile-nickname">닉네임닉네임</div>
      <button className="mypageProfile-profilesetting">프로필 설정</button>
      <div className="mypageProfile-description">
        자기소개 멘트가 들어가는 자리입니다. 자기소개 멘트가 들어가는
        자리입니다. 자기소개 멘트가 들어가는 자리입니다. 자기소개 멘트가
        들어가는 자리입니다.자기소개 멘트가 들어가는 자리입니다. 자기소개 멘트가
        들어가는 자리입니다. 자기소개 멘트가 들어가는 자리입니다. 자기소개
      </div>
    </div>
  );
};

export default MypageProfile;
