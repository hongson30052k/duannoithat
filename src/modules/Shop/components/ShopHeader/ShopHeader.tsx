import bgr from "./img/bgr.svg";
import styles from "./ShopHeader.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const ShopHeader = () => {
  return (
    <div className={cx("shop-header")}>
      <div
        className={cx("shop-header-bgr")}
        style={{ backgroundImage: `url(${bgr})` }}
      >
        <div className={cx("shop-header-title")}>Shop</div>
      </div>
    </div>
  );
};

export default ShopHeader;
