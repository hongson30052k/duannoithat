import SignUpForm from "../SignUpForm/SignUpForm";
import SignUpLeft from "../SignUpLeft/SignUpLeft";
import styles from "./SignUpMain.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const SignUpMain = () => {
  return (
    <div className={cx("sign-up-main")}>
      <SignUpLeft />
      <SignUpForm />
    </div>
  );
};

export default SignUpMain;
