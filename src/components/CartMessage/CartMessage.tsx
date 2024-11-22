import styles from "./CartMessage.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const CardMessage = () => {
  return (
    <div className={cx("card-message")}>
      <span>Sản phẩm đã tồn tại trong giỏ hàng!</span>
    </div>
  );
};

export default CardMessage;
