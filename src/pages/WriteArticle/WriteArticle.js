import React, { useState } from "react";
import "./WriteArticle.scss";

import Input from "components/Input/Input";
import Calendar from "components/Calendar/Calendar";
import Imageuploader from "components/ImageUploader/ImageUploader";

const WriteArticle = () => {
  const [hashtags, setHashtags] = useState([]);
  const [duedate, setDuedate] = useState("7일 후");
  const [selectDate, setSelectDate] = useState(" ");
  const [activeCalendar, setActiveCalendar] = useState(false);

  const onClickDuedate = (e) => {
    setDuedate(e);
  };

  const handleCalendar = () => {
    setActiveCalendar(!activeCalendar);
  };
  const onClickCalendar = (e) => {
    setSelectDate(e);
  };

  const HashtagInput = ({ hashtags, setHashtags, placeholder }) => {
    const [newTag, setNewTag] = useState("");

    const handleSubmit = (e) => {
      if (newTag !== " " && newTag.length > 0) {
        // 스페이스바 32 엔터 13
        if (e.which === 32 || e.which === 13) {
          e.preventDefault();
          setHashtags([...hashtags, newTag]);
          setNewTag("");
        }
      }
    };

    return (
      <input
        type="text"
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
        onKeyPress={handleSubmit}
        placeholder={placeholder}
        className="writearticle-hashtag-input"
      />
    );
  };

  const HashtagList = (props) => {
    const onRemove = (e) => {
      e.preventDefault();
      setHashtags(
        hashtags.filter((hashtag) => hashtag !== e.currentTarget.value)
      );
    };
    const Hashtag = ({ tag }) => {
      return (
        <button className="writearticle-hashtag" onClick={onRemove} value={tag}>
          {tag}
          <span>X</span>
        </button>
      );
    };
    return (
      <div className="writearticle-hashtag-list">
        {props.hashtags.map((tag) => (
          <Hashtag key={tag} tag={tag} />
        ))}
      </div>
    );
  };

  return (
    <div className="writearticle">
      <form className="writearticle-box">
        <ul>
          <li style={{ marginTop: "60px" }}>
            <span className="writearticle-subtitle">제목*</span>
            <span className="writearticle-input">
              <Input type={"text"} placeholder="제목을 입력해주세요." />
            </span>
          </li>
          <li>
            <span className="writearticle-subtitle">부제목</span>
            <span className="writearticle-input">
              <Input
                type={"text"}
                placeholder="내용을 요약하는 부제목을 입력해주세요."
              />
            </span>
          </li>
          <li className="writearticle-subtitle-flexstart">
            <span className="writearticle-subtitle ">내용*</span>
            <span className="writearticle-input">
              <textarea placeholder="내용을 입력해주세요. (10글자 이상)"></textarea>
            </span>
          </li>
          <li
            className="writearticle-subtitle-flexstart"
            style={{ marginTop: "32px" }}
          >
            <span className="writearticle-subtitle ">이미지</span>
            <span className="writearticle-input">
              <Imageuploader />
            </span>
          </li>
          <li
            className="writearticle-subtitle-flexstart"
            style={{ marginBottom: "112px", marginTop: "32px" }}
          >
            <span className="writearticle-subtitle ">태그*</span>
            <span className="writearticle-input">
              <HashtagInput
                hashtags={hashtags}
                setHashtags={setHashtags}
                placeholder={"태그를 입력해주세요. (3개 이상)"}
              />
              {hashtags.length !== 0 && (
                <div>
                  <HashtagList hashtags={hashtags} setHashtags={setHashtags} />
                </div>
              )}
            </span>
          </li>
        </ul>
      </form>
      <div
        className="writearticle-box"
        style={{ paddingTop: "60px", paddingBottom: "60px" }}
      >
        <ul>
          <li>
            <span className="writearticle-subtitle">참여인원*</span>
            <span className="writearticle-input writearticle-manager">
              <Input
                type={"text"}
                placeholder="단위 없이 숫자만 입력해주세요."
              />
              <span style={{ paddingLeft: "12px" }}>명</span>
            </span>
          </li>
          <li style={{ marginTop: "45px" }}>
            <span className="writearticle-subtitle">마감 기간*</span>
            <span className="writearticle-manager-input">
              <button
                onClick={onClickDuedate}
                value={"7일 후"}
                id="writearticle-input-button"
                className={`${
                  duedate === "7일 후" && "writearticle-duedate"
                } writearticle-input-button`}
              >
                7일 후
              </button>
              <button
                onClick={onClickDuedate}
                value={"14일 후"}
                id="writearticle-input-button"
                className={`${
                  duedate === "14일 후" && "writearticle-duedate"
                } writearticle-input-button`}
              >
                14일 후
              </button>
              <button
                onClick={onClickDuedate}
                value={"1달 후"}
                id="writearticle-input-button"
                className={`${
                  duedate === "1달 후" && "writearticle-duedate"
                } writearticle-input-button`}
              >
                1달 후
              </button>
              <div className="writearticle-calendar-box">
                {activeCalendar && (
                  <div className="writearticle-calendar">
                    <Calendar onClick={onClickCalendar} />
                  </div>
                )}
                <button
                  className="writearticle-calendarBtn"
                  onClick={handleCalendar}
                  value={selectDate}
                >
                  {selectDate}
                </button>
              </div>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WriteArticle;
