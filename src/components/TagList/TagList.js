import React from "react";
import "./TagList.scss";
import { useMediaQuery } from "react-responsive";

import HashtagManager from "components/Hashtag/Hashtag";

const TagList = (props) => {
  const isMobile = useMediaQuery({
    query: "(min-width:960px)",
  });

  const mobileTextInput = () => {};
  return (
    <div className="taglist">
      <ul>
        <li
          onClick={props.onClick}
          value={0}
          className={`${props.btnsListSelect === 0 && "btnsListSelected"}`}
        >
          전체
        </li>
        <li
          onClick={props.onClick}
          value={1}
          className={`${props.btnsListSelect === 1 && "btnsListSelected"}`}
        >
          라이프
        </li>
        <li
          onClick={props.onClick}
          value={2}
          className={`${props.btnsListSelect === 2 && "btnsListSelected"}`}
        >
          스포츠
        </li>
        <li
          onClick={props.onClick}
          value={3}
          className={`${props.btnsListSelect === 3 && "btnsListSelected"}`}
        >
          자기개발
        </li>
        <li
          onClick={props.onClick}
          value={4}
          className={`${props.btnsListSelect === 4 && "btnsListSelected"}`}
        >
          여행·맛집
        </li>
        {isMobile ? (
          <HashtagManager
            hashtags={props.hashtags}
            setHashtags={props.setHashtags}
            placeholder="원하는 태그 검색"
          />
        ) : (
          <img
            src={require("../../assets/imgs/search-icon.png")}
            alt="mobileSearchIcon"
          />
        )}
      </ul>
    </div>
  );
};

export default TagList;
