import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { chairProducts } from "./TableDescriptonData";
import styles from "./TableDescription.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useEffect, useState } from "react";
import {
  fetchProductApi,
  fetchProductOptionsId,
} from "../../../../store/slices/CartProductSlice";
const cx = classNames.bind(styles);

const TableDescription = () => {
  const categoryId = localStorage.getItem("categoryId");
  const id = localStorage.getItem("productId");
  const [categoryName, setCategoryName] = useState("");
  const dispatch = useDispatch();
  const cartId: any = useSelector(
    (state: RootState) => state.cartProductState.cardId
  );
  localStorage.setItem("categoryId", cartId?.category);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProductApi(id));
        const res: any = await dispatch(fetchProductOptionsId(categoryId));
        setCategoryName(res?.payload?.name);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch, id]);
  console.log(cartId, "cartId");
  return (
    <div className={cx("product-info-container")}>
      <div className={cx("info-item")}>
        <strong className={cx("label")}>Xuất xứ:</strong>
        <span className={cx("value")}>{cartId?.country}</span>
      </div>
      <div className={cx("info-item")}>
        <strong className={cx("label")}>Loại sản phẩm:</strong>
        <span className={cx("value")}>{categoryName}</span>
      </div>
      <div className={cx("info-item")}>
        <strong className={cx("label")}>Nhà sản xuất:</strong>
        <span className={cx("value")}>{cartId?.manufacturerName}</span>
      </div>
      <div className={cx("info-item")}>
        <strong className={cx("label")}>Thông tin nhà sản xuất:</strong>
        <span className={cx("value")}>{cartId?.manufacturerInfo}</span>
      </div>
      <div className={cx("info-item")}>
        <strong className={cx("label")}>Thông tin mô tả sản phẩm:</strong>
        <div className={cx("product-description")}>
          {cartId?.manufacturerProducts &&
            cartId?.manufacturerProducts.map((item: any) => (
              <div key={item} className={cx("product-description-item")}>
                {item}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TableDescription;
