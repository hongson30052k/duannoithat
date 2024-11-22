import CardMessage from "../../../../components/CartMessage/CartMessage";
import img from "./img/img.svg";
import styles from "./MainHome.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const MainHome = () => {
  return (
    <div className={cx("main-home")}>
      <span className={cx("title")}>Browse The Range</span>
      <span className={cx("text-muted")}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </span>
      <div className={cx("main-home-content")}>
        <div className={cx("main-home-card")}>
          <img src={img} />
          <span className={cx("card-title")}>Dining</span>
        </div>
        <div className={cx("main-home-card")}>
          <img src={img} />
          <span className={cx("card-title")}>Dining</span>
        </div>
        <div className={cx("main-home-card")}>
          <img src={img} />
          <span className={cx("card-title")}>Dining</span>
        </div>
      </div>
    </div>
  );
};

export default MainHome;
