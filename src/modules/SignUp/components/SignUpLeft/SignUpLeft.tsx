import bgrSignup from "../../../../access/img/SignUp/bgrSignup.svg";
import styles from "./SignUpLeft.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const SignUpLeft = () => {
  return (
    <div
      className={cx("sign-up-left")}
      style={{ backgroundImage: `url(${bgrSignup})` }}
    ></div>
  );
};

export default SignUpLeft;
