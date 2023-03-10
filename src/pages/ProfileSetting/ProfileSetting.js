import React, { useState } from "react";
import "./ProfileSetting.scss";

import { useMediaQuery } from "react-responsive";

import ProfileSettingMenuList from "components/ProfileSettingMenuList/ProfileSettingMenuList";
import ProfileEdit from "components/ProfileEdit/ProfileEdit";
import ProfileBasciEdit from "components/ProfileBasciEdit/ProfileBasciEdit";
import ProfileDetailsEdit from "components/ProfileDetailsEdit/ProfileDetailsEdit";
import Space from "components/Space/Space";
import ProfilePwEdit from "components/ProfilePwEdit/ProfilePwEdit";
import axios from "axios";
import { BASE_URL } from "config";

const ProfileSetting = () => {
  const isMobile = useMediaQuery({
    query: "(min-width:960px)",
  });

  const [currentPage, setCurrentPage] = useState("정보 수정");
  const [tags, setTags] = useState([]);
  const [postImages, setPostImages] = useState([]); // 서버로 보낼 이미지 데이터
  const [detailImages, setDetailImages] = useState([]); // 프리뷰 보여줄 이미지 데이터

  const [inputs, setInputs] = useState({
    introduce: "",
    name: "",
    phoneNumber: "",
    email: "",
    nickname: "",
    sex: true,
    birth: "",
  });

  const onChangePage = (e) => setCurrentPage(e.currentTarget.innerText);
  const onChangeSex = (e) =>
    setInputs({ ...inputs, sex: e.currentTarget.innerText === "남" });

  const uploadFile = (e) => {
    e.preventDefault();
    let fileArr = e.target.files; //  사용자가 선택한 파일들
    setPostImages(fileArr[0]);
    for (let i = 0; i < fileArr.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(fileArr[i]);

      reader.onloadend = () => {
        const base64 = reader.result;
        if (base64) {
          let base64Sub = base64.toString();
          setDetailImages((Images) => [...Images, base64Sub]);
        }
      };
    }
  };

  const onChangeInput = (e) => {
    switch (e.target.name) {
      case "introduce":
        setInputs({ ...inputs, introduce: e.target.value });
        break;
      case "name":
        setInputs({ ...inputs, name: e.target.value });
        break;
      case "phoneNumber":
        setInputs({ ...inputs, phoneNumber: e.target.value });
        break;
      case "email":
        setInputs({ ...inputs, email: e.target.value });
        break;
      case "nickname":
        setInputs({ ...inputs, nickname: e.target.value });
        break;
      case "birth":
        setInputs({ ...inputs, birth: e.target.value });
        break;
      default:
        break;
    }
  };

  const onSave = async () => {
    const { introduce, name, phoneNumber, email, nickname, sex, birth } =
      inputs;
    const frm = new FormData();

    frm.append("id", localStorage.getItem("id"));
    frm.append("profile", postImages);
    frm.append("introduce", introduce);
    frm.append("name", name);
    frm.append("phone", phoneNumber);
    frm.append("email", email);
    frm.append("nickname", nickname);
    frm.append("sex", sex);
    frm.append("birthday", birth);
    frm.append("tag", tags);

    await axios({
      method: "POST",
      url: `${BASE_URL}/my/update`,
      data: frm,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="profileSetting">
      <div className="profileSetting-menu">
        <ProfileSettingMenuList
          currentPage={currentPage}
          onChangePage={onChangePage}
        />
      </div>
      <div className="profileSetting-content">
        {currentPage === "정보 수정" ? (
          <>
            <ProfileEdit
              onChangeInput={onChangeInput}
              inputs={inputs}
              Images={detailImages}
              setImages={setDetailImages}
              uploadFile={uploadFile}
            />
            <Space size={16} />
            <ProfileBasciEdit onChangeInput={onChangeInput} inputs={inputs} />
            <Space size={16} />
            <ProfileDetailsEdit
              onChangeInput={onChangeInput}
              inputs={inputs}
              tags={tags}
              setTags={setTags}
              onChangeSex={onChangeSex}
            />
            <Space size={40} />
            <button className="profileSetting-save" onClick={onSave}>
              저장
            </button>
            {!isMobile && <Space size={120} />}
          </>
        ) : (
          <ProfilePwEdit />
        )}
        {isMobile && <Space size={200} />}
      </div>
    </div>
  );
};

export default ProfileSetting;
