import React, { useEffect, useState } from "react";
import "./ContentsCard.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Tag from "components/Tag/Tag";
import { getDayMinuteCounter } from "assets/utils/getDayCouter";
import Space from "components/Space/Space";

const ContentsCard = (props) => {
  const {
    image,
    tags,
    title,
    content,
    member,
    maxMember,
    deadline,
    filter,
    idx,
    subtitle,
  } = props;

  const navigate = useNavigate();

  const memberDeadline = maxMember - member === 1;

  const [img, setImage] = useState();
  const Image = () => {
    axios({
      method: "POST",
      url: image[0],
      responseType: "blob",
    }).then((res) => {
      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: res.headers["content-type"] })
      );

      setImage(url);
    });
  };

  const onClickDetail = (idx) => {
    navigate(`/StoryDetail/${idx}`, { state: { idx: idx, root: "content" } });
  };

  useEffect(() => {
    Image();
  }, []);

  return (
    <div className="contentsCard" onClick={() => onClickDetail(idx)}>
      <div
        className="contentsCard-image-dday"
        style={image ? {} : { margin: 0 }}
      >
        {getDayMinuteCounter(new Date(deadline).valueOf())}
      </div>
      {memberDeadline && (
        <div className="contentsCard-deadlie-message">마감임박</div>
      )}
      {image && (
        <div className="contentsCard-image">
          <img src={img} alt={`${img}`} />
        </div>
      )}
      <div
        className="contentsCard-text"
        style={!image ? { marginTop: "32px" } : {}}
      >
        {tags && (
          <div className="contentsCard-tag">
            {tags.map((tag, index) => (
              <React.Fragment key={`${tag}${index}`}>
                <Tag text={tag} id={index} key={`${tag}index`} />
                <Space size={"0.417vw"} />
              </React.Fragment>
            ))}
          </div>
        )}
        {title && <div className="contentsCard-title">{title}</div>}

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
