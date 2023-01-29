import React, { useState } from "react";
import "./StoryCard.scss";

import Tag from "components/Tag/Tag";

const StoryCard = (props) => {
  const [liked, setLiked] = useState(false);

  const handleClick = () => {
    setLiked(!liked);
  };
  const { profileImg, profileName, date, img, tags, title, content, like } =
    props.item;

  return (
    <div className="storycard">
      <div className="storycard-profile">
        <img src={profileImg} alt="cat" />

        <div className="storycard-info">
          {profileName} <br />
          <span>23시간 전</span>
        </div>
      </div>
      {img && (
        <div className="storycard-image">
          <img src={img} />
        </div>
      )}
      <div className="storycard-detail">
        <div className="storycard-contents">
          {tags && (
            <div className="storycard-tag">
              {tags.map((tag, index) => (
                <Tag text={tag} id={index} />
              ))}
            </div>
          )}
          <div className="storycard-title">{title}</div>
          <div className="storycard-content">{content}</div>
        </div>
        <div className="storycard-like">
          <button className={liked ? "liked" : ""} onClick={handleClick} />
          <span className={liked ? "liked" : ""}>{like}</span>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
