import React, { useCallback, useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CheckoutPageMain.module.scss";
import classNames from "classnames/bind";
import { RootState } from "../../../../store/store";
import { useFormik } from "formik";
import GenerateIdWithDate from "../../../../utils/GenerateIdWithDate/GenerateIdWithDate";
import { useNavigate } from "react-router-dom";
import { fetchCreateOrder } from "../../../../store/slices/CartOderSlice";
import {
  fetchColor,
  fetchGetImgProduct,
} from "../../../../store/slices/CartProductSlice";
import { fetchGetUserProduct } from "../../../../store/slices/UserProductSlice";

const cx = classNames.bind(styles);

const CheckoutPageMain = () => {
  const userId: any = JSON.parse(localStorage.getItem("user") || "{}");
  const [colors, setColors] = useState<any>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let result = 0;
  const { userProducts } = useSelector(
    (state: RootState) => state.userProductState
  );
  const { cartImg } = useSelector((state: RootState) => state.cartProductState);
  console.log(cartImg, "cartImg");
  for (let i = 0; i < userProducts.length; i++) {
    result +=
      userProducts[i].product.discounted_price * userProducts[i].quantity;
  }
  console.log(userProducts, "userProducts");
  const formik = useFormik({
    initialValues: {
      name: userId?.username,
      address: userId?.address,
      phone: userId?.phone,
      paymentMethod: "cash",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Vui lòng nhập tên"),
      address: Yup.string().required("Vui lòng nhập điểm giao hàng"),
      phone: Yup.string().required("Vui lý nhập điểm giao hàng"),
    }),
    onSubmit: async (values) => {
      const value = {
        id: id,
        name: formik.values.name,
        address: formik.values.address,
        phone: formik.values.phone,
        paymentMethod: formik.values.paymentMethod,
        total: result,
        product: userProducts,
        userId: userProducts[0].userId,
        date: new Date(),
        status: "Pending",
      };
      const res: any = await dispatch(fetchCreateOrder(value));
      console.log(res.payload, "res");
      if (typeof res.payload === "string") {
        alert("Đơn hàng thất bại");
      } else {
        alert("Đơn hàng thành công");
        navigate("/");
      }
    },
  });
  const handleReset = (e: any) => {
    e.preventDefault();
    navigate(-1);
  };
  let id = useMemo(() => GenerateIdWithDate(), []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchGetUserProduct(userId.id));
        await dispatch(fetchGetImgProduct());
        const res: any = await dispatch(fetchColor());
        setColors(res?.payload);
      } catch (error) {
        console.log(error);
      }
    };
    if (data.length === 0) {
      alert("Giỏ hàng của bạn đang trống");
    }
    fetchData();
  }, []);
  const data = userProducts.map((item: any) => {
    const item2 = cartImg.find((item1: any) => item1.id === item.product.id);
    return item2 ? { ...item, ...item2 } : item;
  });
  console.log(data, "data");
  return (
    <div className={cx("checkoutPage")}>
      <h2>Trang Thanh Toán</h2>
      <div className={cx("checkoutForm")}>
        <div className={cx("cartDetails")}>
          <h3>Thông tin giỏ hàng</h3>
          {data && data?.length > 0 ? (
            <div className={cx("cartItems")}>
              {data.map((item: any) => {
                console.log(
                  item,
                  "item............................................."
                );
                const colorFind = colors.find(
                  (item2: any) => item2?.hex === item?.color
                );
                console.log(colorFind, "colorFind");
                const discounted_price = item?.product?.discounted_price;
                return (
                  <div key={item?.product.id} className={cx("cartItem")}>
                    <img
                      src={item?.img}
                      alt={item?.product.name}
                      className={cx("productImage")}
                      style={{ width: "100px", height: "100px" }}
                    />
                    <div className={cx("productInfo")}>
                      <h3>{item.product.name}</h3>
                      {item.size && item.size !== 0 ? (
                        <p>Size: {item.size}</p>
                      ) : null}
                      {item.color && item.color !== 0 ? (
                        <p>Màu sắc: {colorFind?.name}</p>
                      ) : null}
                      <p>Số lượng: {item.quantity}</p>
                      <p>{Number(discounted_price).toLocaleString()} VND</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>Giỏ hàng trống.</p>
          )}
        </div>

        <div className={cx("totalAmount")}>
          <h3>Tổng tiền</h3>
          <p>{result.toLocaleString()} VND</p>
        </div>

        <form className={cx("userInfo")} onSubmit={formik.handleSubmit}>
          <h3>Thông tin giao hàng</h3>
          <label className={cx("label")}>
            Id Sản phẩm:
            <>
              <input type="text" value={id} />
            </>
          </label>

          <label>
            Tên:
            <>
              <input
                onChange={formik.handleChange}
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                placeholder="Nhập tên của bạn"
              />
            </>
          </label>
          <label>
            Địa chỉ:
            <input
              type="text"
              id="address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              placeholder="Nhập địa chỉ của bạn"
            />
          </label>
          <label>
            Số điện thoại:
            <input
              type="number"
              id="phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              placeholder="Nhập email của bạn"
            />
          </label>

          <div className={cx("paymentMethod")}>
            <h3>Phương thức thanh toán</h3>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formik.values.paymentMethod}
              onChange={formik.handleChange}
            >
              <option value="cash">Tiền mặt khi nhận hàng</option>
              <option value="creditCard">Thẻ tín dụng</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
          <div className={cx("checkoutButton")}>
            <button type="submit">Thanh toán</button>
            <button onClick={(e) => handleReset(e)}>Hủy</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPageMain;
