import React, { useState } from "react";
import "./StoryDetail.scss";

import StoryDetailTitle from "components/StoryDetailTitle/StoryDetailTitle";
import StoryDetailContent from "components/StoryDetailContent/StoryDetailContent";

import image from "../../assets/imgs/cat.jpg";
import image2 from "../../assets/imgs/cat.jpg";
import image3 from "../../assets/imgs/midbtn.jpg";

const StoryDetail = () => {
  const [page, setPage] = useState({
    left: true,
    mid: true,
    right: true,
  });

  return (
    <div className="storyDetail">
      <div className="storyDetail-title">
        <StoryDetailTitle />
      </div>
      <div className="storyDetail-content">
        <StoryDetailContent />
      </div>
      <div className="storyDetail-bottom">
        {page.left && (
          <button className="storyDetail-btn-left">
            <img src={image} />
            <div className="storyDetail-btn-title">이전 스토리</div>
            <div className="storyDetail-btn-content">
              타이틀 최대 2줄 타이틀 최대 2줄 타이틀 최대 2줄...타이틀 최대 2줄
              타이틀 최대 2줄 타이틀 최대 2줄...
            </div>
            <div className="storyDetail-btn-time">3시간 전</div>
          </button>
        )}

        {page.mid && (
          <button
            className="storyDetail-btn-mid"
            style={{
              borderRadius: `${
                !page.left
                  ? "10px 0px 0px 10px"
                  : !page.right && "0px 10px 10px 0px"
              }`,
            }}
          >
            <img src={image3} />
            <div className="storyDetail-btn-title">현재 스토리</div>
            <div className="storyDetail-btn-content">
              타이틀 최대 2줄 타이틀 최대 2줄 타이틀 최대 2줄...타이틀 최대 2줄
              타이틀 최대 2줄 타이틀 최대 2줄...
            </div>
            <div className="storyDetail-btn-time">3시간 전</div>
          </button>
        )}
        {page.right && (
          <button className="storyDetail-btn-right">
            <img src={image2} />

            <div className="storyDetail-btn-title">다음 스토리</div>
            <div className="storyDetail-btn-content">
              타이틀 최대 2줄 타이틀 최대 2줄 타이틀 최대 2줄 타이틀 최대 2줄
              타이틀 최대 2줄 타이틀 최대 2줄...
            </div>
            <div className="storyDetail-btn-time">3시간 전</div>
          </button>
        )}
      </div>
    </div>
  );
};

export default StoryDetail;
