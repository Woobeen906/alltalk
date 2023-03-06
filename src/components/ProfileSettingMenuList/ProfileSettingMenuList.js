import React, { useState } from "react";
import "./ProfileSettingMenuList.scss";

import { useMediaQuery } from "react-responsive";

import Space from "components/Space/Space";

const ProfileSettingMenuList = (props) => {
  const { currentPage, onChangePage } = props;

  const isMobile = useMediaQuery({
    query: "(min-width:960px)",
  });

  // const [currentPage, setCurrentPage] = useState("정보 수정");
  return (
    <div className="profileSettingMenuList">
      {isMobile && (
        <div className="profileSettingMenuList-title">프로필 설정</div>
      )}
      <ul>
        <li
          className={`${
            currentPage === "정보 수정" && "profilesettingCurrent"
          }`}
          onClick={onChangePage}
        >
          정보 수정
        </li>
        <Space size={isMobile ? 32 : "6.66vw"} />
        <li
          className={`${
            currentPage === "비밀번호 변경" && "profilesettingCurrent"
          }`}
          onClick={onChangePage}
        >
          비밀번호 변경
        </li>
        <Space size={isMobile ? 32 : "6.66vw"} />
        <li
          className={`${currentPage === "회원탈퇴" && "profilesettingCurrent"}`}
        >
          회원탈퇴
        </li>
      </ul>
    </div>
  );
};

export default ProfileSettingMenuList;
