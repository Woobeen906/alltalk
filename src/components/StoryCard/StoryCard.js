import React, { useEffect, useState } from "react";
import "./StoryCard.scss";

import Tag from "components/Tag/Tag";

import axios from "axios";
import { BASE_URL } from "config";
import { useNavigate } from "react-router-dom";

import { getDayMinuteCounter } from "assets/utils/getDayCouter";

const StoryCard = (props) => {
  const {
    profile,
    nickname,
    day,
    img,
    tag,
    title,
    content,
    like,
    subtitle,
    idx,
    islike,
  } = props.item;
  const navigate = useNavigate();

  const [eventActive, setEventActive] = useState(true);
  const [liked, setLiked] = useState(islike);
  const [likeCnt, setLikeCnt] = useState(like);
  const [image, setImage] = useState();
  const [profileImg, setProfile] = useState();
  const [tagFilter, setTagFilter] = useState(false);

  const handleClick = async () => {
    const frm = new FormData();
    frm.append("id", localStorage.getItem("id"));
    frm.append("idx", idx);
    await axios({
      method: "POST",
      url: `${BASE_URL}/util/story/like`,
      data: frm,
    }).then((res) => {
      if (res.data.result) {
        setLikeCnt((prev) => {
          return prev + 1;
        });
        setLiked(!liked);
      }
    });
  };

  const Image = () => {
    axios({
      method: "POST",
      url: img,
      responseType: "blob",
    }).then((res) => {
      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: res.headers["content-type"] })
      );

      setImage(url);
    });
  };

  const ProfileImg = () => {
    axios({
      method: "POST",
      url: profile,
      responseType: "blob",
    }).then((res) => {
      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: res.headers["content-type"] })
      );

      setProfile(url);
    });
  };

  const onClickDetail = () => {
    eventActive &&
      navigate(`/StoryDetail/${idx}`, {
        state: { idx: idx, root: "story", like: like },
      });
  };

  const filterTags = () => {
    for (let hashtag = 0; hashtag < props.hashtags.length; hashtag++) {
      tag.split(",").find((item) => {
        return item === props.hashtags[hashtag] && setTagFilter(true);
      });
    }
  };

  useEffect(() => {
    Image();
    ProfileImg();
  }, []);

  useEffect(() => {
    filterTags();
  }, [props.hashtags]);

  return (
    <div
      className="storycard"
      style={{
        display:
          (tag.split(",").find((item) => item === props.filter) === undefined &&
            props.filter !== "all") ||
          (props.hashtags.length > 0 && !tagFilter)
            ? "none"
            : "",
      }}
      onClick={() => onClickDetail()}
    >
      <div className="storycard-profile">
        {profileImg ? (
          <img src={profileImg} alt="profileImg" />
        ) : (
          <img src={require("../../assets/imgs/default.png")} />
        )}

        <div className="storycard-info">
          {nickname} <br />
          <span>{getDayMinuteCounter(day)}</span>
        </div>
      </div>
      {img && (
        <div className="storycard-image">
          <img src={image} />
        </div>
      )}
      <div className="storycard-detail">
        <div className="storycard-contents">
          {tag && (
            <div className="storycard-tag">
              {tag.split(",").map((tag, index) => (
                <Tag text={tag} id={index} />
              ))}
            </div>
          )}
          <div className="storycard-title">{title}</div>
          <div className="storycard-content">{subtitle}</div>
        </div>
        <div
          className="storycard-like"
          onMouseEnter={() => setEventActive(false)}
          onMouseLeave={() => setEventActive(true)}
        >
          <button
            className={liked ? "liked" : ""}
            onClick={() => handleClick()}
          />
          <span className={liked ? "liked" : ""}>{likeCnt}</span>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
