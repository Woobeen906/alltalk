import React from "react";
import "./ContentsCard.scss";

import Tag from "components/Tag/Tag";

const ContentsCard = (props) => {
  const { image, tags, title, content, member, maxMember } = props;
  const deadline = maxMember - member === 1;

  return (
    <div className="contentsCard">
      <div
        className="contentsCard-image-dday"
        style={image ? {} : { margin: 0 }}
      >
        D-2
      </div>
      {deadline && (
        <div className="contentsCard-deadline-message">마감임박</div>
      )}
      {image && (
        <div className="contentsCard-image">
          <img src={image} alt="cat" />
        </div>
      )}
      <div
        className="contentsCard-text"
        style={!image ? { marginTop: "32px" } : {}}
      >
        {tags && (
          <div className="contentsCard-tag">
            {tags.map((tag, index) => (
              <Tag text={tag} id={index} />
            ))}
          </div>
        )}
        {!title && (
          <div className="contentsCard-title">
            {title}
            asdakljsdfhakjsdhfakjsdhfkajsdfasdakljsdfhakjsdhfakjsdhfkajsdfasdakljsdfhakjsdhfakjsdhfkajsdfasdakljsdfhakjsdhfakjsdhfkajsdf
          </div>
        )}

        {!image && (
          <div className="contentsCard-content">
            {content}
            asdakljsdfhakjsdhfakjsdhfkajsdfasdakljsdfhakjsdhfakjsdhfkajsdfasdakljsdfhakjsdhfakjsdhfkajsdfasdakljsdfhakjsdhfakjsdhfkajsdfasdakljsdfhakjsdhfakjsdhfkajsdfasdakljsdfhakjsdhfakjsdhfkajsdfasdakljsdfhakjsdhfakjsdhfkajsdfasdakljsdfhakjsdhfakjsdhfkajsdfasdakljsdfhakjsdhfakjsdhfkajsdfasdakljsdfhakjsdhfakjsdhfkajsdfasdakljsdfhakjsdhfakjsdhfkajsdfasdakljsdfhakjsdhfakjsdhfkajsdf
          </div>
        )}
        <div className="contentsCard-number">
          <img
            src={require("assets/imgs/memberNumber.jpg")}
            alt="contentsCardMemberNumber"
          />
          모집 인원{" "}
          <strong
            style={deadline ? { color: "red" } : { color: "black" }}
          >{`${member}/${maxMember}`}</strong>
        </div>
      </div>
    </div>
  );
};

export default ContentsCard;
