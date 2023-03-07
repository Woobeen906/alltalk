import React, { forwardRef } from "react";
import "./Scene2.scss";

import { useMediaQuery } from "react-responsive";

import HistoryList from "components/HistoryList/HistoryList";

const Scene2 = forwardRef((props, ref) => {
  const { animate } = props;

  const isMobile = useMediaQuery({
    query: "(min-width:960px)",
  });

  return (
    <div className="scene2" ref={ref}>
      <div className="scene2-backgroundimg"></div>
      <div className="scene2-left">
        <div className="scene2-left-text">
          ALLTALK는
          <br />
          <span>사회적 트렌드를</span>
          <br />
          추구하고 성장합니다.
        </div>
      </div>
      <div className="scene2-right">
        <HistoryList animate={animate} />
      </div>
    </div>
  );
});

export default Scene2;
