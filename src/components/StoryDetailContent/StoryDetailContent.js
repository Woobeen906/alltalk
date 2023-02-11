import React from "react";
import "./StoryDetailContent.scss";

import Gallery from "components/Gallery/Gallery";
import StoryDetailUserInfo from "components/StoryDetailUserInfo/StoryDetailUserInfo";
import Space from "components/Space/Space";

import calendar from "assets/imgs/calendar.jpg";
import memberNumber from "assets/imgs/memberNumber2x.jpg";

const texts = `재판의 심리와 판결은 공개한다.
다만, 심리는 국가의 안전보장 또는 안녕질서를 방해하거나 선량한 풍속을 해할 염려가 있을 때에는 법원의 결정으로 공개하지 아니할 수 있다. 재의의 요구가 있을 때에는 국회는 재의에 붙이고, 재적의원과반수의 출석과 출석의원 3분의 2 이상의 찬성으로 전과 같은 의결을 하면 그 법률안은 법률로서 확정된다.

국무위원은 국무총리의 제청으로 대통령이 임명한다.

대통령은 국회에 출석하여 발언하거나 서한으로 의견을 표시할 수 있다.
국가는 재해를 예방하고 그 위험으로부터 국민을 보호하기 위하여 노력하여야 한다. 대통령은 국민의 보통·평등·직접·비밀선거에 의하여 선출한다. 지방의회의 조직·권한·의원선거와 지방자치단체의 장의 선임방법 기타 지방자치단체의 조직과 운영에 관한 사항은 법률로 정한다.

재판의 심리와 판결은 공개한다.
다만, 심리는 국가의 안전보장 또는 안녕질서를 방해하거나 선량한 풍속을 해할 염려가 있을 때에는 법원의 결정으로 공개하지 아니할 수 있다. 재의의 요구가 있을 때에는 국회는 재의에 붙이고, 재적의원과반수의 출석과 출석의원 3분의 2 이상의 찬성으로 전과 같은 의결을 하면 그 법률안은 법률로서 확정된다.`;

const StoryDetailContent = () => {
  const tags = [
    "태그1",
    "태그2",
    "태그3",
    "태그5513512412",
    "태그4",
    "태그5",
    "태그5513512412",
  ];

  const ManagerInfo = ({ img, text, number, dday = "" }) => {
    return (
      <div className="storyDetailContent-managerInfo">
        <img src={img} />
        <Space size={8} />
        <div className="storyDetailContent-managerInfo-text">{text}</div>
        <span>{`${number} ${dday && `· ${dday}`}`}</span>
      </div>
    );
  };

  const Line = () => {
    return <div className="Line"></div>;
  };
  return (
    <div className="storyDetailContent">
      <div className="storyDetailContent-contents">
        <Gallery />
        <div className="storyDetailContent-contents-textarea">
          {texts.split("\n").map((line) => {
            return (
              <>
                {line}
                <br />
              </>
            );
          })}
        </div>
        <Line />
        <div className="storyDetailContent-taglist">
          {tags.map((tag) => (
            <div className="storyDetailContent-tag">{tag}</div>
          ))}
        </div>
      </div>
      <div className="storyDetailContent-contentsinfo">
        <div className="storyDetailContent-manager">
          <ManagerInfo
            img={calendar}
            text="마감일"
            number={"2023.01.30"}
            dday={"D-1"}
          />
          <Space size={25} />

          <ManagerInfo img={memberNumber} text="모집인원" number={15} />
          <Space size={25} />

          <ManagerInfo img={memberNumber} text="신청인원" number={13} />
        </div>
        <StoryDetailUserInfo />
        <Space size={15} />
        <div className="storyDetailContent-tagbox">
          <div className="storyDetailContent-tagbox-title">태그</div>
          <div className="storyDetailContent-tagbox-list">
            {tags.map((tag) => (
              <div className="storyDetailContent-tagbox-tag">{tag}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetailContent;
