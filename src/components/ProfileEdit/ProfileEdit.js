import React, { useEffect, useState } from "react";
import "./ProfileEdit.scss";

import axios from "axios";
import { BASE_URL } from "config";

import defaultPorfile from "assets/imgs/defaultPorfile.png";

const ProfileEdit = (props) => {
  const { onChangeInput, inputs, uploadFile, Images, setImages } = props;
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

  const deleteImg = () => setImages(defaultPorfile);

  return (
    <div className="profileEdit">
      프로필 수정
      <div className="profileEdit-info">
        {Images ? (
          <img src={Images} alt={"profileImg"} />
        ) : (
          <img src={profileImg} alt={"profileImg"} />
        )}
        <div className="profileEdit-info-btns">
          <input
            className="profileEdit-info-imgchange"
            placeholder="프로필사진 변경"
            type={"file"}
            onChange={uploadFile}
          />

          <button
            className="profileEdit-info-delete"
            onClick={() => deleteImg()}
          >
            사진 삭제
          </button>
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
