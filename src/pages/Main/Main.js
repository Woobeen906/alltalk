import React, { useState } from "react";
import "./Main.scss";

import Banner from "components/Slide/Slide";
import ContentsCard from "components/ContentsCard/ContentsCard";
import ToggleBtn from "components/ToggleBtn/ToggleBtn";
import { HashtagList } from "components/Hashtag/Hashtag";
import TagList from "components/TagList/TagList";

const Main = () => {
  const [toggleActive, setToggleActive] = useState(true);
  const [btnsListSelect, setBtnsListSelect] = useState(0);
  const [hashtags, setHashtags] = useState([]);

  const onClickList = (e) => {
    setBtnsListSelect(e.currentTarget.value);
  };

  const onClickToggle = () => {
    setToggleActive(!toggleActive);
  };

  const testTags = ["라이프", "생활"];
  const testContentsCards = [
    {
      image: require("assets/imgs/cat.jpg"),
      tags: testTags,
      member: 12,
      maxMember: 15,
    },
    {
      image: require("assets/imgs/cat.jpg"),
      tags: testTags,
      member: 12,
      maxMember: 15,
    },
    {
      image: require("assets/imgs/cat.jpg"),
      tags: testTags,
      member: 14,
      maxMember: 15,
    },
    {
      image: "",
      tags: testTags,
      member: 12,
      maxMember: 15,
    },
    {
      image: require("assets/imgs/cat.jpg"),
      tags: testTags,
      member: 12,
      maxMember: 15,
    },
    {
      image: require("assets/imgs/cat.jpg"),
      tags: testTags,
      member: 12,
      maxMember: 15,
    },
  ];
  return (
    <div className="Main">
      <Banner />
      <div className="main-content">
        <div className="main-title">
          일상에 <span>새로운 이벤트</span>를 더해보세요
        </div>
        <div className="main-btns">
          <div className="main-btns-toggle">
            <ToggleBtn
              text="모집 중"
              active={toggleActive}
              onClick={onClickToggle}
            />
            <ToggleBtn
              text="모집 완료"
              active={!toggleActive}
              onClick={onClickToggle}
            />
          </div>
          <TagList
            onClick={onClickList}
            btnsListSelect={btnsListSelect}
            hashtags={hashtags}
            setHashtags={setHashtags}
          />
        </div>
        <div className="main-line"></div>
        {hashtags.length !== 0 && (
          <div className="main-hashtag-list">
            태그 검색:&nbsp;
            <HashtagList hashtags={hashtags} setHashtags={setHashtags} />
          </div>
        )}
        <div className="main-grid">
          {testContentsCards.map((item, index) => (
            <ContentsCard
              image={item.image}
              tags={testTags}
              member={item.member}
              maxMember={item.maxMember}
              id={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
