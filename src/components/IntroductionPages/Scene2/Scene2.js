import HistoryList from "components/HistoryList/HistoryList";
import React from "react";
import "./Scene2.scss";

const Scene2 = () => {
  return (
    <div className="scene2">
      <div className="scene2-backgroundimg"></div>
      <div className="scene2-left">
        ALLTALK는
        <br />
        <span>사회적 트렌드를</span>
        <br />
        추구하고 성장합니다.
      </div>
      <div className="scene2-right">
        <HistoryList />
      </div>
    </div>
  );
};

export default Scene2;
