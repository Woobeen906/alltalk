import React, { useEffect, useState } from "react";
import "./MypageCard.scss";

import { getDayMinuteCounter } from "assets/utils/getDayCouter";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import { BASE_URL } from "config";

const COLOR = ["#191919", "#616269", "#00CB8E"];

const MypageCard = (props) => {
  const { img, title, day, listType, idx } = props;

  const isMobile = useMediaQuery({
    query: "(min-width:960px)",
  });

  const [image, setImage] = useState();
  const [date, setDate] = useState();
  const [data, setData] = useState();

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

  const loadData = async () => {
    await axios({
      method: "POST",
      url: `${BASE_URL}/story/${idx}`,
    }).then((res) => {
      if (res.data !== "error") {
        setData(res.data);
      } else console.log(res.data);
    });
  };

  useEffect(() => {
    Image();
    loadData();
    const temp = new Date(day);
    let year = temp.getFullYear();
    let month = temp.getMonth() + 1;
    let dday = temp.getDate();

    if (month < 10) month = "0" + month;
    if (dday < 10) dday = "0" + dday;
    setDate(`${year}.${month}.${dday}`);
  }, []);

  const Tag = (tag) => {
    return <div className="mypage-tag">{tag}</div>;
  };

  return isMobile ? (
    <div
      className="mypageCard"
      style={{
        backgroundColor: img ? "" : COLOR[Math.floor(Math.random() * 3)],
      }}
    >
      {img ? (
        <>
          <img src={image} alt={img} />
          <div className="mypageCard-description">
            <div className="mypageCard-description-title">{title}</div>
            <div className="mypageCard-description-date">
              {getDayMinuteCounter(day)}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mypageCard-noneImg">
            <div className="mypageCard-description-title">{title}</div>
          </div>
        </>
      )}
    </div>
  ) : listType == 0 ? (
    <div className="mypageCard-mobile-card">
      <div className="mypageCard-mobile-card-date">{date}</div>
      {img && (
        <div className="mypageCard-mobile-card-img">
          <img src={image} alt={img} />
        </div>
      )}
      <div className="mypageCard-mobile-card-tags">
        {data && data.story.tag.split(",").map((tag, index) => Tag(tag))}
      </div>
      <div className="mypageCard-mobile-card-textBox">
        <div className="mypageCard-mobile-card-title">{title}</div>
        <div className="mypageCard-mobile-card-content">
          {data && data.story.content}
        </div>
      </div>
    </div>
  ) : (
    <div className="mypageCard-mobile-type2">
      {img ? (
        <img src={image} />
      ) : (
        <div
          className="mypageCard-none"
          style={{
            backgroundColor: img ? "" : COLOR[Math.floor(Math.random() * 3)],
          }}
        >
          <div className="mypageCard-noneImg">
            asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf
          </div>
        </div>
      )}
    </div>
  );
};

export default MypageCard;
