import React, { useState } from "react";
import "./ProfileDetailsEdit.scss";

import Input from "components/Input/Input";
import Space from "components/Space/Space";
import HashtagManager, { HashtagList } from "components/Hashtag/Hashtag";

const ProfileDetailsEdit = (props) => {
  const { onChangeInput, inputs, tags, setTags, onChangeSex } = props;

  const onRemove = (e) => {
    e.preventDefault();
    setTags(tags.filter((hashtag) => hashtag !== e.currentTarget.value));
  };

  return (
    <div className="profileDetailsEdit">
      상세정보 수정
      <div className="profileDetailsEdit-inputs">
        <div className="profileDetailsEdit-input-box">
          닉네임*
          <Space size={16} />
          <Input
            type="text"
            name="nickname"
            maxlength={8}
            onChange={onChangeInput}
          />
          <div className="profileDetailsEdit-input-box-nameCnt">{`${inputs.nickname.length}/8`}</div>
          <Space size={24} />
        </div>
        <div className="profileDetailsEdit-input-box">
          성별*
          <Space size={16} />
          <div className="profileDetailsEdit-input-box-btns">
            <button
              className={`profileDetailsEdit-btn-left  profileDetailsEdit-input-btn ${
                inputs.sex && "profileDetailsEdit-input-active"
              }`}
              onClick={onChangeSex}
            >
              남
            </button>
            <button
              className={`profileDetailsEdit-btn-right profileDetailsEdit-input-btn ${
                !inputs.sex && "profileDetailsEdit-input-active"
              }`}
              onClick={onChangeSex}
            >
              여
            </button>
          </div>
          <Space size={24} />
        </div>
        <div className="profileDetailsEdit-input-box">
          생년월일 8자리*
          <Space size={16} />
          <Input
            type="text"
            name="birth"
            maxLength={8}
            onChange={onChangeInput}
          />
          <Space size={24} />
        </div>
        <div className="profileDetailsEdit-input-box">
          관심사 태그 (3개 이상)*
          <Space size={16} />
          <HashtagManager
            background={true}
            hashtags={tags}
            setHashtags={setTags}
            placeholder="관심사 태그를 입력해주세요. (ex:스포츠)"
            size={"large"}
          />
          <Space size={12} />
          {tags.length !== 0 && (
            <div className="profileDetailsEdit-hashtag-list">
              <HashtagList hashtags={tags} default={true} onClick={onRemove} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsEdit;
