import React, { useState } from "react";
import "./StoryList.scss";

import TagList from "components/TagList/TagList";
import { HashtagList } from "components/Hashtag/Hashtag";
import StoryCard from "components/StoryCard/StoryCard";

const StoryList = () => {
  const [btnsListSelect, setBtnsListSelect] = useState(0);
  const [hashtags, setHashtags] = useState([]);

  const onClickList = (e) => {
    setBtnsListSelect(e.currentTarget.value);
  };

  const testContentsCards = [
    {
      profileImg: require("../../assets/imgs/cat.jpg"),
      profileName: "닉네임닉네임",
      date: "2022-12-13",
      img: "",
      tags: ["라이프", "생활"],
      title: "타이틀",
      content: "content",
      like: 1,
    },
    {
      profileImg: require("../../assets/imgs/cat.jpg"),
      profileName: "닉네임닉네임",
      date: "2022-12-13",
      img: require("../../assets/imgs/cat.jpg"),
      tags: ["라이프", "생활"],
      title: "타이틀",
      content: "content",
      like: 1,
    },
    {
      profileImg: require("../../assets/imgs/cat.jpg"),
      profileName: "닉네임닉네임",
      date: "2022-12-13",
      img: require("../../assets/imgs/cat.jpg"),
      tags: ["라이프", "생활"],
      title: "타이틀",
      content: "content",
      like: 1,
    },
    {
      profileImg: require("../../assets/imgs/cat.jpg"),
      profileName: "닉네임닉네임",
      date: "2022-12-13",
      img: require("../../assets/imgs/cat.jpg"),
      tags: ["라이프", "생활"],
      title: "타이틀",
      content: "content",
      like: 1,
    },
    {
      profileImg: require("../../assets/imgs/cat.jpg"),
      profileName: "닉네임닉네임",
      date: "2022-12-13",
      img: require("../../assets/imgs/cat.jpg"),
      tags: ["라이프", "생활"],
      title: "타이틀",
      content: "content",
      like: 1,
    },
  ];
  return (
    <div className="storylist">
      <div className="storylist-content">
        <TagList
          onClick={onClickList}
          btnsListSelect={btnsListSelect}
          hashtags={hashtags}
          setHashtags={setHashtags}
        />

        <div className="storylist-line"></div>
        {hashtags.length !== 0 && (
          <div className="storylist-hashtag-list">
            태그 검색:&nbsp;
            <HashtagList hashtags={hashtags} setHashtags={setHashtags} />
          </div>
        )}
        <div className="storylist-grid">
          {testContentsCards.map((item, index) => (
            <StoryCard item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryList;
