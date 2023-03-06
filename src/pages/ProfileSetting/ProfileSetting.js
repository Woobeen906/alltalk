import React, { useState } from "react";
import "./ProfileSetting.scss";

import { useMediaQuery } from "react-responsive";

import ProfileSettingMenuList from "components/ProfileSettingMenuList/ProfileSettingMenuList";
import ProfileEdit from "components/ProfileEdit/ProfileEdit";
import ProfileBasciEdit from "components/ProfileBasciEdit/ProfileBasciEdit";
import ProfileDetailsEdit from "components/ProfileDetailsEdit/ProfileDetailsEdit";
import Space from "components/Space/Space";
import ProfilePwEdit from "components/ProfilePwEdit/ProfilePwEdit";

const ProfileSetting = () => {
  const isMobile = useMediaQuery({
    query: "(min-width:960px)",
  });

  const [currentPage, setCurrentPage] = useState("정보 수정");
  const [tags, setTags] = useState([]);

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
  const onChangeSex = (e) => {
    e.currentTarget.innerText === "남"
      ? setInputs({ ...inputs, sex: true })
      : setInputs({ ...inputs, sex: false });
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
      case "sex":
        setInputs({ ...inputs, sex: e.target.value });
        break;
      case "birth":
        setInputs({ ...inputs, birth: e.target.value });
        break;

      default:
        break;
    }
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
            <ProfileEdit onChangeInput={onChangeInput} inputs={inputs} />
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
            <button className="profileSetting-save">저장</button>
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
