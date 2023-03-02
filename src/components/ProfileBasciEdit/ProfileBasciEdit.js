import React from "react";
import "./ProfileBasciEdit.scss";

import Input from "components/Input/Input";
import Space from "components/Space/Space";

const ProfileBasciEdit = (props) => {
  const { onChangeInput, inputs } = props;

  return (
    <div className="profileBasciEdit">
      기본정보 수정
      <div className="profileBasciEdit-inputs">
        <div className="profileBasciEdit-input-box">
          이름*
          <Space size={16} />
          <Input
            type="text"
            name="name"
            maxlength={8}
            placeholder="이름을 입력해주세요."
            onChange={onChangeInput}
          />
          <div className="profileBasciEdit-input-box-nameCnt">{`${inputs.name.length}/8`}</div>
          <Space size={24} />
        </div>
        <div className="profileBasciEdit-input-box">
          휴대폰번호*
          <Space size={16} />
          <Input
            type="number"
            name="phoneNumber"
            placeholder="‘-’ 없이 입력 (ex:01012345678)"
            onChange={onChangeInput}
          />
          <Space size={24} />
        </div>
        <div className="profileBasciEdit-input-box">
          이메일*
          <Space size={16} />
          <Input type="email" name="email" onChange={onChangeInput} />
        </div>
      </div>
    </div>
  );
};

export default ProfileBasciEdit;
