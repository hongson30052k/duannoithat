import bgrSignup from "../../../../access/img/SignUp/bgrSignup.svg";
import styles from "./UserLoginLeft.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const UserLoginLeft = () => {
  return (
    <div
      className={cx("login-left")}
      style={{ backgroundImage: `url(${bgrSignup})` }}
    ></div>
  );
};

export default UserLoginLeft;
