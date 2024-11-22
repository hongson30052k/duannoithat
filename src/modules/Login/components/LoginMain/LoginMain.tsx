import LoginForm from "../LoginForm/LoginForm";
import LoginLeft from "../LoginLeft/LoginLeft";
import styles from "./LoginMain.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const LoginMain = () => {
  return (
    <div className={cx("login-main")}>
      <LoginLeft />
      <LoginForm />
    </div>
  );
};

export default LoginMain;
