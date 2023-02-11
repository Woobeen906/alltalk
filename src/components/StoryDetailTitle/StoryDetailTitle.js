import Space from "components/Space/Space";
import React from "react";
import "./StoryDetailTitle.scss";

const StoryDetailTitle = () => {
  return (
    <div className="storyDetailTitle">
      <div className="storyDetailTitle-cards">
        <span className="dday-card">d-1</span>
        <Space size={8} />
        <span className="deadline-card">마감임박</span>
      </div>

      <div className="storyDetailTitle-texts">
        <div className="storyDetailTitle-title">제목</div>
        <div className="storyDetailTitle-subtitle">서브 제목</div>
      </div>

      <div className="storyDetailTitle-userInfo">
        <div className="storyDetailTitle-userInfo-left">
          <img src={require("../../assets/imgs/cat.jpg")} alt={"userimage"} />
          <div className="storyDetailTitle-name">닉네임</div>
          <div className="storyDetailTitle-date">2022.01.31</div>
        </div>

        <div className="storyDetailTitle-userInfo-right">
          <div className="storyDetailTitle-btns">
            <button className="storyDetailTitle-btn">수정</button>
            <Space size={4} />
            <button className="storyDetailTitle-btn" style={{ color: "red" }}>
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetailTitle;
