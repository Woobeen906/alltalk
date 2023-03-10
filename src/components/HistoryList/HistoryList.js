import React from "react";
import "./HistoryList.scss";

import { useMediaQuery } from "react-responsive";

import Space from "components/Space/Space";

const HistoryList = (props) => {
  const { animate } = props;

  const isMobile = useMediaQuery({
    query: "(min-width:960px)",
  });

  return (
    <div className={`historyList ${animate && "historyList-animate"}`}>
      <div className="historyList-box">
        <div className="historyList-text-box">
          <div className="historyList-text-left">
            <div className="historyList-dot"></div>
            <div className="historyList-line"></div>
          </div>
          <div className="historyList-text-right">
            <div className="historyList-box-title">2022</div>
            <div
              className="historyList-box-content"
              style={{ animationDelay: "0.8s" }}
            >
              부산대학교 창업중심대학 선정
              <br />
              한국장학재단 IR피칭대회 장려상
              <br />
              한국 공학인증원 우수상
              <br />
              부산광역시 장애인종합 복지관 MOU체결
              <br />
              해양대학교 이노폴리스 사업 선정
              <br />
              BIGS 입주기업
              <br />
              <Space size={isMobile ? 40 : 24} />
            </div>
          </div>
        </div>

        <div className="historyList-text-box">
          <div className="historyList-text-left">
            <div className="historyList-dot"></div>
            <div className="historyList-line"></div>
          </div>
          <div className="historyList-text-right">
            <div className="historyList-box-title">2021</div>
            <div
              className="historyList-box-content"
              style={{ animationDelay: "1.1s" }}
            >
              과학기술 정보 통신부 ‘공공기술 기반 시장 연계 창업 탐색 지원사업
              I-Core 사업’선정
              <br />
              R&D 부산시 관광지 추천 시스템 개발 연구원
              <br />
              KIC Washington DC 해외창업교육 수료
              <br />
              ‘AI무인 분리수거함’ 한국 논문과학회 우수상
              <br />
              <Space size={isMobile ? 40 : 24} />
            </div>
          </div>
        </div>

        <div className="historyList-text-box">
          <div className="historyList-text-left">
            <div className="historyList-dot"></div>
          </div>
          <div className="historyList-text-right">
            <div className="historyList-box-title">2020</div>
            <div
              className="historyList-box-content"
              style={{ animationDelay: "1.4s" }}
            >
              동아대학교 알고리즘 대회 우수상
              <br />
              동아대학교 창업동아리 선정
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryList;
