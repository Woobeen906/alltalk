import React from "react";
import "./ProfileSetting.scss";

import ProfileSettingMenuList from "components/ProfileSettingMenuList/ProfileSettingMenuList";
import ProfileEdit from "components/ProfileEdit/ProfileEdit";

const ProfileSetting = () => {
  return (
    <div className="profileSetting">
      {/* <ProfileSettingMenuList /> */}
      <ProfileEdit />
    </div>
  );
};

export default ProfileSetting;
