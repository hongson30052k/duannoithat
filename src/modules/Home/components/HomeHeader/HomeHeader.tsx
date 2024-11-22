import bgr from "./img/bgr.svg";
import styles from "./HomeHeader.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const HomeHeader = () => {
  return (
    <div
      className={cx("home-header")}
      style={{ backgroundImage: `url(${bgr})` }}
    >
      <div
        className={cx("home-header-content")}
        style={{ backgroundColor: "#FFF3E3" }}
      >
        <span className={cx("new-arrival")}>New Arrival</span>
        <span className={cx("title")}>Discover Our New Collection</span>
        <span className={cx("text-muted")}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis.
        </span>
        <button className={cx("btn")}>BUY NOW</button>
      </div>
    </div>
  );
};

export default HomeHeader;
