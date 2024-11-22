import { useEffect, useMemo, useState } from "react";
import styles from "./ProfileShopping.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDecrease,
  fetchDeleteProduct,
  fetchDeleteUserProduct,
  fetchGetUserProduct,
  fetchIncrease,
} from "../../../../store/slices/UserProductSlice";
import { RootState } from "../../../../store/store";
import { useNavigate } from "react-router-dom";
import {
  fetchAddImgProduct,
  fetchColor,
  fetchGetImgProduct,
  fetchGetImgProductId,
} from "../../../../store/slices/CartProductSlice";
import GenerateIdWithDate from "../../../../utils/GenerateIdWithDate/GenerateIdWithDate";
const cx = classNames.bind(styles);

const ProfileShopping = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [color, setColor] = useState<any>([]);
  let result = 0;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userProducts, action } = useSelector(
    (state: RootState) => state.userProductState
  );
  const { cartImg } = useSelector((state: RootState) => state.cartProductState);
  console.log(userProducts, "userProducts");
  console.log(cartImg, "cartImg");
  const deleteAllCart = async () => {
    const res: any = await dispatch(fetchDeleteUserProduct(user.id));
  };
  const handleIncrease = (id: any) => {
    dispatch(fetchIncrease(id));
  };
  const handleDecrease = (id: any) => {
    dispatch(fetchDecrease(id));
  };
  const handleDelete = async (id: any) => {
    await dispatch(fetchDeleteProduct(id));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchGetUserProduct(user.id));
        await dispatch(fetchGetImgProduct());
        const res: any = await dispatch(fetchColor());
        setColor(res?.payload);
        console.log(color, "color");
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [action, dispatch, user.id]);

  if (userProducts && userProducts.length > 0) {
    for (let i = 0; i < userProducts.length; i++) {
      result +=
        userProducts[i].product.discounted_price * userProducts[i].quantity;
    }
  }
  const handleSubmit = () => {
    if (result > 0) {
      navigate("/order");
    } else {
      alert("Gior hàng trống!");
    }
  };
  const data = userProducts?.map((item: any) => {
    const item1 = cartImg?.find(
      (item2: any) => item2?.id === item?.product?.id
    );
    return item1 ? { ...item, ...item1 } : item;
  });
  console.log(data, "data");
  return (
    <div className={cx("shopping-cart")}>
      <div className={cx("cart-header")}>
        <h2>Giỏ Hàng</h2>
        <button className={cx("clear-cart")} onClick={deleteAllCart}>
          Xóa Giỏ Hàng
        </button>
      </div>
      {data && data.length > 0 ? (
        data.map((item: any) => {
          const discounted_price = Number(item.product.discounted_price);
          const original_price = Number(item.product.original_price);
          const formatDiscountPrice = discounted_price?.toLocaleString();
          const formatOriginalPrice = original_price?.toLocaleString();
          const colorFind = color.find(
            (item2: any) => item2?.hex === item?.color
          );
          return (
            <div className={cx("cart-items")}>
              <div key={item.product.id} className={cx("cart-item")}>
                <img
                  src={item.img}
                  alt={item.product.name}
                  className="item-image"
                  style={{ width: "70px", height: "7 0px" }}
                />
                <div className={cx("item-details")}>
                  <h3>{item.product.name}</h3>
                  {item?.size && item?.size !== 0 ? (
                    <p
                      style={{
                        border: "1px solid",
                        padding: "5px",
                      }}
                    >
                      Size: {item?.size}
                    </p>
                  ) : null}

                  {item?.color && item?.color !== 0 ? (
                    <p
                      style={{
                        border: "1px solid",
                        padding: "5px",
                      }}
                    >
                      Color: {colorFind?.name}
                    </p>
                  ) : null}
                  <div className={cx("price-info")}>
                    <p className={cx("original-price")}>
                      {formatOriginalPrice} VND
                    </p>
                    <p className={cx("discounted-price")}>
                      {formatDiscountPrice} VND
                    </p>
                  </div>
                  <div className={cx("item-quantity")}>
                    <button onClick={() => handleDecrease(item.productId)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrease(item.productId)}>
                      +
                    </button>
                  </div>
                  <button
                    className={cx("remove-item")}
                    onClick={() => {
                      handleDelete(item.productId);
                    }}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className={cx("cart-empty")}>không có sản phẩm</div>
      )}

      <div className={cx("cart-summary")}>
        <div className={cx("total")}>
          <p>Tổng tiền:</p>
          <p className={cx("total-price")}>{result.toLocaleString()} VND</p>
        </div>
        <button className={cx("checkout-button")} onClick={handleSubmit}>
          Thanh Toán
        </button>
      </div>
    </div>
  );
};

export default ProfileShopping;
