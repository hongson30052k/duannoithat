import classNames from "classnames/bind";
import styles from "./Specification.module.scss";
import { phone } from "../../../../config/product.config";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductApi } from "../../../../store/slices/CartProductSlice";
import { RootState } from "../../../../store/store";
const cx = classNames.bind(styles);

const Specification = () => {
  const dispatch = useDispatch();
  const id = localStorage.getItem("productId");
  const { cardId }: any = useSelector(
    (state: RootState) => state.cartProductState
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProductApi(id));
      } catch (error) {}
    };
    fetchData();
  }, [dispatch, id]);
  // console.log(cardId, "cardId");

  return (
    <div className={cx("specification")}>
      <div className={cx("specification-address")}>
        <span className={cx("specification-title")}>GỌI ĐẶT MUA:</span>
        <span className={cx("specification-phone")}>{phone}</span>
        <span className={cx("specification-time")}>( 08:00 - 18:00 )</span>
      </div>
      <div className={cx("specification-content")}>
        {cardId?.brandName && (
          <div className={cx("specification-info")}>
            <span className={cx("specification-title")}>Thương hiệu</span>
            <span className={cx("specification-content")}>
              {cardId?.brandName}
            </span>
          </div>
        )}
        {cardId.brandDescription && (
          <div className={cx("specification-info")}>
            <span className={cx("specification-title")}>Mô tả thương hiệu</span>
            <span className={cx("specification-content")}>
              {cardId?.brandDescription}
            </span>
          </div>
        )}
        <div className={cx("specification-info")}>
          <span className={cx("specification-title")}>Chất lượng</span>
          <span className={cx("specification-content")}>
            Bánh xe bằng nhựa PU, Chân ghế bằng nhựa PP, Khung ghế bằng
            Polypropylene + Fiberglass
          </span>
        </div>
        <div className={cx("specification-info")}>
          <span className={cx("specification-title")}>Bảo hành</span>
          <span className={cx("specification-content")}>
            36 tháng theo tiêu chuẩn nhà máy
          </span>
        </div>
      </div>
    </div>
  );
};

export default Specification;
