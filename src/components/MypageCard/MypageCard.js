import React, { useEffect, useState } from "react";
import "./MypageCard.scss";

import { getDayMinuteCounter } from "assets/utils/getDayCouter";
import axios from "axios";

const MypageCard = (props) => {
  const { img, title, day } = props;

  const [image, setImage] = useState();
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

  useEffect(() => {
    Image();
  }, []);
  return (
    <div className="mypageCard">
      <img src={image} alt={img} />
      <div className="mypageCard-description">
        <div className="mypageCard-description-title">{title}</div>
        <div className="mypageCard-description-date">
          {getDayMinuteCounter(day)}
        </div>
      </div>
    </div>
  );
};

export default MypageCard;
