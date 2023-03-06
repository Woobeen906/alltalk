import React, { useEffect, useState } from "react";
import "./ProfileEdit.scss";

import axios from "axios";
import { BASE_URL } from "config";

const ProfileEdit = (props) => {
  const { onChangeInput, inputs } = props;
  const [profileImg, setProfileImg] = useState();

  const loadImg = async () => {
    await axios({
      method: "POST",
      url: `${BASE_URL}/util/${localStorage.getItem("id")}/profile`,
      responseType: "blob",
    }).then((res) => {
      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: res.headers["content-type"] })
      );
      setProfileImg(url);
    });
  };

  useEffect(() => {
    loadImg();
  }, []);

  return (
    <div className="profileEdit">
      프로필 수정
      <div className="profileEdit-info">
        <img src={profileImg} alt={"profileImg"} />
        <div className="profileEdit-info-btns">
          <input
            className="profileEdit-info-imgchange"
            placeholder="프로필사진 변경"
            type={"file"}
          />

          <button className="profileEdit-info-delete">사진 삭제</button>
        </div>
      </div>
      <div className="profileEdit-info-textarea">
        자기소개
        <textarea
          type="text"
          maxlength={150}
          name="introduce"
          onChange={onChangeInput}
        />
        <div className="profileEdit-info-textarea-length">{`${inputs.introduce.length}/150`}</div>
      </div>
    </div>
  );
};

export default React.memo(ProfileEdit);
