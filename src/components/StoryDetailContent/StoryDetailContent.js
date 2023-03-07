import React, { Fragment, useEffect, useState } from "react";
import "./StoryDetailContent.scss";

import { useMediaQuery } from "react-responsive";

import Gallery from "components/Gallery/Gallery";
import StoryDetailUserInfo from "components/StoryDetailUserInfo/StoryDetailUserInfo";
import Space from "components/Space/Space";

import calendar from "assets/imgs/calendar.jpg";
import memberNumber from "assets/imgs/memberNumber2x.jpg";
import { getDayMinuteCounter } from "assets/utils/getDayCouter";

const StoryDetailContent = (props) => {
  const { story, imgs, user, root } = props;

  const isMobile = useMediaQuery({
    query: "(min-width:960px)",
  });

  const ManagerInfo = ({ img, text, number, member, dday = "" }) => {
    const date = new Date(number);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return (
      <div className="storyDetailContent-managerInfo">
        <img src={img} />
        <Space size={8} />
        {/* {text} */}
        <div
          className="storyDetailContent-managerInfo-text"
          style={{ color: story.member + 1 >= story.maxMember && "red" }}
        >
          {member >= 0 ? member : `${year}.${month}.${day}`}
        </div>
        {dday && <span>{dday}</span>}
      </div>
    );
  };
  const Line = () => {
    return <div className="Line"></div>;
  };

  return (
    <div className="storyDetailContent">
      <div className="storyDetailContent-contents">
        {<Gallery imgs={imgs} />}

        {!isMobile && root === "content" && (
          <div className="storyDetailContent-manager-mobile">
            <ManagerInfo
              img={calendar}
              text="마감일"
              number={story.day}
              dday={getDayMinuteCounter(story.deadline)}
            />
            <Space size={15} />
            <ManagerInfo
              img={memberNumber}
              text="모집인원"
              member={story.maxMember}
            />
            <Space size={15} />
            <ManagerInfo
              img={memberNumber}
              text="신청인원"
              member={story.member}
            />
          </div>
        )}

        <div className="storyDetailContent-contents-textarea">
          {story.content.split("\n").map((line, index) => {
            return (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            );
          })}
        </div>
        {isMobile && <Line />}
        <div className="storyDetailContent-taglist">
          {story.tag.split(",").map((tag) => (
            <div key={tag} className="storyDetailContent-tag">
              {tag}
            </div>
          ))}
        </div>

        {!isMobile && <StoryDetailUserInfo user={user} />}
      </div>

      {isMobile && (
        <div className="storyDetailContent-contentsinfo">
          {root === "content" && (
            <div className="storyDetailContent-manager">
              <ManagerInfo
                img={calendar}
                text="마감일"
                number={story.day}
                dday={getDayMinuteCounter(story.deadline)}
              />
              <Space size={25} />
              <ManagerInfo
                img={memberNumber}
                text="모집인원"
                member={story.maxMember}
              />
              <Space size={25} />
              <ManagerInfo
                img={memberNumber}
                text="신청인원"
                member={story.member}
              />
            </div>
          )}
          <StoryDetailUserInfo user={user} />
          <Space size={15} />
          <div className="storyDetailContent-tagbox">
            <div className="storyDetailContent-tagbox-title">태그</div>
            <div className="storyDetailContent-tagbox-list">
              {story.tag.split(",").map((tag, index) => (
                <div
                  key={`${tag}${index}`}
                  className="storyDetailContent-tagbox-tag"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryDetailContent;
