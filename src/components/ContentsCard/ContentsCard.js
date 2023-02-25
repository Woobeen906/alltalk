import React, { useEffect, useState } from "react";
import "./ContentsCard.scss";

import Tag from "components/Tag/Tag";
import { getDayMinuteCounter } from "assets/utils/getDayCouter";

const ContentsCard = (props) => {
  const { image, tags, title, content, member, maxMember, deadline } = props;
  const memberDeadline = maxMember - member === 1;

  return (
    <div className="contentsCard">
      <div
        className="contentsCard-image-dday"
        style={image ? {} : { margin: 0 }}
      >
        {`D-${getDayMinuteCounter(deadline).slice(0, 1)}`}
      </div>
      {memberDeadline && (
        <div className="contentsCard-deadlie-message">마감임박</div>
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
              <Tag text={tag} id={index} key={`${tag}index`} />
            ))}
          </div>
        )}
        {!title && <div className="contentsCard-title">{title}</div>}

        {!image && <div className="contentsCard-content">{content}</div>}
        <div className="contentsCard-number">
          <img
            src={require("assets/imgs/memberNumber.jpg")}
            alt="contentsCardMemberNumber"
          />
          모집 인원{" "}
          <strong
            style={memberDeadline ? { color: "red" } : { color: "black" }}
          >{`${member}/${maxMember}`}</strong>
        </div>
      </div>
    </div>
  );
};

export default ContentsCard;
