import React, { useEffect, useState } from "react";
import "./MypageCard.scss";

import { getDayMinuteCounter } from "assets/utils/getDayCouter";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import { BASE_URL } from "config";

const COLOR = ["#191919", "#616269", "#00CB8E"];

const MypageCard = (props) => {
  const { img, listType, selectMenu } = props;
  const isMobile = useMediaQuery({
    query: "(min-width:960px)",
  });

  const [image, setImage] = useState();

  const [nonImg, setNonImg] = useState(false);

  const [date, setDate] = useState();

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

  const loadStoryImg = (img) => {
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

  useEffect(() => {
    selectMenu === "스토리" ? Image() : loadStoryImg(props.img[0]);

    const temp = new Date(props.item.day);
    let year = temp.getFullYear();
    let month = temp.getMonth() + 1;
    let dday = temp.getDate();

    if (month < 10) month = "0" + month;
    if (dday < 10) dday = "0" + dday;
    setDate(`${year}.${month}.${dday}`);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setNonImg(true);
    }, 500);

    console.log(props.item.img);
  }, [image]);

  const Tag = (tag) => {
    return <div className="mypage-tag">{tag}</div>;
  };

  return isMobile ? (
    <div
      className="mypageCard"
      style={{
        backgroundColor: props.item.img
          ? ""
          : COLOR[Math.floor(Math.random() * 3)],
      }}
    >
      {props.item.img ? (
        <>
          <img src={image} alt={img} />
          <div className="mypageCard-description">
            <div className="mypageCard-description-title">
              {props.item && props.item.title}
            </div>
            <div className="mypageCard-description-date">
              {props.item && getDayMinuteCounter(props.item.day)}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mypageCard-noneImg">
            <div className="mypageCard-description-title">
              {props.item && props.item.title}
            </div>
          </div>
        </>
      )}
    </div>
  ) : listType == 0 ? (
    <div className="mypageCard-mobile-card">
      <div className="mypageCard-mobile-card-date">{date}</div>
      {image && (
        <div className="mypageCard-mobile-card-img">
          <img src={image} alt={img} />
        </div>
      )}
      <div className="mypageCard-mobile-card-tags">
        {selectMenu === "좋아요" &&
          props.item &&
          props.item.tag.split(",").map((tag, index) => Tag(tag))}
      </div>
      <div className="mypageCard-mobile-card-textBox">
        <div className="mypageCard-mobile-card-title">
          {props.item && props.item.title}
        </div>
        <div className="mypageCard-mobile-card-content">
          {props.item && props.item.content}
        </div>
      </div>
    </div>
  ) : (
    <div className="mypageCard-mobile-type2">
      {image ? (
        <img src={image} />
      ) : (
        <div
          className="mypageCard-none"
          style={{
            backgroundColor: image ? "" : COLOR[Math.floor(Math.random() * 3)],
          }}
        >
          <div className="mypageCard-noneImg">
            {props.item && props.item.content}
          </div>
        </div>
      )}
    </div>
  );
};

export default MypageCard;
