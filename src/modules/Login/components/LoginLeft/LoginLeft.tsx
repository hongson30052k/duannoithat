import bgrSignup from "../../../../access/img/SignUp/bgrSignup.svg";
import styles from "./LoginLeft.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const LoginLeft = () => {
  return (
    <div
      className={cx("login-left")}
      style={{ backgroundImage: `url(${bgrSignup})` }}
    ></div>
  );
};

export default LoginLeft;
