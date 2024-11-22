import styles from "./Transport.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const Transport = () => {
  return (
    <div className={cx("transport")}>
      <span className={cx("transport-title")}>Vận chuyển</span>
      <span className={cx("transport-content")}>
        Govi thực hiện chính sách giao hàng trên toàn quốc
      </span>
      <span className={cx("transport-content")}>
        Đơn hàng sẽ được giao tới Quý khách hàng bằng hình thức vận chuyển trực
        tiếp bởi nhân viên Govi hoặc thông qua công ty vận chuyển trung gian.
      </span>
      <span className={cx("transport-content")}>
        Về phí vận chuyển, Govi hỗ trợ miễn phí hoặc một phần tùy vào giá trị
        đơn hàng và địa điểm nhận hàng.
      </span>
      <span className={cx("transport-content")}>
        Chi tiết chính sách, Quý khách hàng vui lòng đọc thật kỹ thông tin dưới
        đây:
      </span>
    </div>
  );
};

export default Transport;
