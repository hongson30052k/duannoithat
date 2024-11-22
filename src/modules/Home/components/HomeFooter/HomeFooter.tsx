import bgr from "./img/bgr.svg";
import styles from "./HomeFooter.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const HomeFooter = () => {
  return (
    <div
      className={cx("home-footter")}
      style={{ backgroundImage: `url(${bgr})` }}
    >
      <div className={cx("home-footter-content")}>
        <div className={cx("text")}>Share your setup with</div>
        <div className={cx("title")}>#FuniroFurniture</div>
      </div>
    </div>
  );
};

export default HomeFooter;
