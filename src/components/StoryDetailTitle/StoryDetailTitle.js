import React, { useEffect, useState } from "react";
import "./StoryDetailTitle.scss";

import axios from "axios";

import { getDayMinuteCounter } from "assets/utils/getDayCouter";
import Space from "components/Space/Space";

const StoryDetailTitle = (props) => {
  const { story, user, root } = props;
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
    setTimeout(() => {
      setMount(true);
    }, 500);
  }, []);

  useEffect(() => {
    loadImg();
  }, [mount]);

  return (
    <div className="storyDetailTitle">
      {root === "content" && (
        <div className="storyDetailTitle-cards">
          <span className="dday-card">
            {getDayMinuteCounter(story.deadline)}
          </span>
          <Space size={8} />
          {story.maxMember - story.member <= 1 && (
            <span className="deadline-card">마감임박</span>
          )}
        </div>
      )}

      <div className="storyDetailTitle-texts">
        <div className="storyDetailTitle-title">{story.title}</div>
        <div className="storyDetailTitle-subtitle">{story.subtitle}</div>
      </div>

      <div className="storyDetailTitle-userInfo">
        <div className="storyDetailTitle-userInfo-left">
          {/* <img src={require("../../assets/imgs/cat.jpg")} alt={"userimage"} /> */}
          {profileImg && <img src={profileImg} alt={"userimage"} />}
          <div className="storyDetailTitle-name">{user.nickname}</div>
          <div className="storyDetailTitle-date">{`${new Date(
            story.day
          ).getFullYear()}.${new Date(story.day).getMonth() + 1}.${new Date(
            story.day
          ).getDate()}
    ${new Date(story.day).getHours()}:${new Date(
            story.day
          ).getMinutes()}`}</div>
        </div>

        {nickname === user.nickname && (
          <div className="storyDetailTitle-userInfo-right">
            <div className="storyDetailTitle-btns">
              <button className="storyDetailTitle-btn">수정</button>
              <Space size={4} />
              <button className="storyDetailTitle-btn" style={{ color: "red" }}>
                삭제
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryDetailTitle;
