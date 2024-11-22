import UserLoginForm from "../UserLoginForm/UserLoginForm";
import UserLoginLeft from "../UserLoginLeft/UserLoginLeft";
import styles from "./UserLoginMain.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const UserLoginMain = () => {
  return (
    <div className={cx("login-main")}>
      <UserLoginLeft />
      <UserLoginForm />
    </div>
  );
};

export default UserLoginMain;
