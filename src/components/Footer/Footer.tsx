import styles from "./Footer.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <>
      <div className={cx("main-home-footter")}>
        <div className={cx("main-home-footter-1")}>
          <span className={cx("main-title")}>Paradise view</span>
          <span className={cx("main-desc")}>
            The service at the Hotel Monteleone was exceptional. There was
            absolutely no issue that was not addressed timely and with
            satisfactory results. We were particulary impressed with how the
            hotel staff anticipated our needs (periodically coming by the Board
            Room to check with us)
          </span>
        </div>
        <div className={cx("main-home-footter-2")}>
          <span className={cx("main-title")}>Quick Links</span>
          <div className={cx("main-home-footter-2-1")}>
            <span>Room Booking</span>
            <span>Rooms</span>
            <span>Contact</span>
            <span>Explore</span>
          </div>
        </div>
        <div className={cx("main-home-footter-3")}>
          <span className={cx("main-title")}>Company</span>
          <div className={cx("main-home-footter-3-1")}>
            <span>Privacy Policy</span>
            <span>Refund Policy</span>
            <span>F.A.Q</span>
            <span>About</span>
          </div>
        </div>
        <div className={cx("main-home-footter-4")}>
          <span className={cx("main-title")}>Social media</span>
          <div className={cx("main-home-footter-4-1")}>
            <span>Facebook</span>
            <span>Instagram</span>
            <span>Twitter</span>
            <span>Youtube</span>
          </div>
        </div>
        <div className={cx("main-home-footter-5")}>
          <span className={cx("main-title5")}>Contact</span>
          <span>
            Kindly subscribe to our newsletter to get latest deals on our rooms
            and vacation discount.
          </span>
        </div>
        <span className={cx("main-title6")}>Paradise view 2024</span>
      </div>
    </>
  );
};

export default Footer;
