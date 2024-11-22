import ProfileSidebar from "../ProfileSidebar.tsx/ProfileSidebar";
import styles from "./ProfileContent.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const ProfileContent = () => {
  return (
    <div className={cx("profile-content")}>
      <ProfileSidebar />
    </div>
  );
};

export default ProfileContent;
