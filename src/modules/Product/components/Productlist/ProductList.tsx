import { useDispatch, useSelector } from "react-redux";
import Ratings from "../../../../components/Rating/Rating";
import styles from "./ProductList.module.scss";
import classNames from "classnames/bind";
import { RootState } from "../../../../store/store";
import { useCallback, useEffect, useState } from "react";
import {
  fetchGetImgProduct,
  fetchGetImgProductId,
  fetchProductApi,
  setLoading,
} from "../../../../store/slices/CartProductSlice";
import {
  fetchAddProductId,
  fetchDecrease,
  fetchIncrease,
} from "../../../../store/slices/UserProductSlice";
import { axiosInstance } from "../../../../api/axiosClient";
import { calculateDiscountPercentage } from "../../../../utils/calculateDiscountPercentage/calculateDiscountPercentage";
import { toast } from "react-toastify";
const cx = classNames.bind(styles);

const ProductList = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.userState
  );
  const id: any = localStorage.getItem("productId");
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(0);
  const [size, setSize] = useState(0);
  const dispatch = useDispatch();
  const { cardId, cardImg, status }: any = useSelector(
    (state: RootState) => state.cartProductState
  );
  const handleDecrease = async () => {
    if (quantity > 1) setQuantity((prevQuantity) => prevQuantity - 1);
  };
  const handleIncrease = async () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleAddToCart = async (id: any) => {
    if (user.isAdmin && isAuthenticated) {
      toast.error(
        "bạn là tài khoản admin không thể thêm sản phẩm vào giỏ hàng"
      );
      return;
    } else if (!user.isAdmin && isAuthenticated) {
      toast.success("bạn đã thêm sản phẩm vào giỏ hàng");
    } else if (!isAuthenticated) {
      toast.error("bạn chưa đăng nhập vui lòng đăng nhập");
      return;
    }
    if (data && user?.id) {
      try {
        const existData: any = await axiosInstance.get(
          `/cart?userId=${user?.id}`
        );
        const hasProduct = existData.find(
          (item: any) => item?.productId === id
        );
        if (hasProduct) {
          const body = {
            productId: id,
            quantity: Number(hasProduct?.quantity) + quantity,
          };
          await axiosInstance.put(
            `/cart?productId=${hasProduct?.productId}`,
            body
          );
        } else {
          const body = {
            productId: id,
            quantity: quantity,
            userId: user?.id,
            color: color,
            size: size,
          };
          await axiosInstance.post("/cart", body);
        }
      } catch (error) {}
    }
  };
  const fetchData = useCallback(async (id: any) => {
    try {
      await dispatch(fetchProductApi(id));
      await dispatch(fetchGetImgProductId(id));
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }, []);
  const data = { ...cardId, ...cardImg };

  useEffect(() => {
    const fetchDataS = async () => {
      if (id) {
        fetchData(id);
        if (data?.color && data?.color.length > 0) {
          setColor(data?.color[0]);
        }
      }
    };
    fetchDataS();
  }, [id, fetchData]);
  console.log(color, "color");
  const discounted_price = Number(data.discounted_price);
  const original_price = Number(data.original_price);
  const formatDiscountPrice = discounted_price?.toLocaleString();
  const formatOriginalPrice = original_price?.toLocaleString();
  const handleAddColor = (item: any) => {
    setColor(item);
  };
  return (
    <>
      {data && (
        <>
          <div className={cx("product-list")}>
            <div className={cx("product-list-content")}>
              <div className={cx("product-list-img2")}>
                <img
                  src={data?.img}
                  alt=""
                  className={cx("product-list-img2")}
                />
                <div className={cx("text-percent-discount")}>
                  <span>
                    {calculateDiscountPercentage(
                      data.discounted_price,
                      data.original_price
                    )}
                    %
                  </span>
                </div>
              </div>
              <br />
              <br />
              <div className={cx("product-list-info")}>
                <span className={cx("text-title")}>{data?.name}</span>
                <span className={cx("text-price")}>
                  <p>{formatDiscountPrice} vnđ</p>
                  <span className={cx("text-price-original")}>
                    {formatOriginalPrice}
                  </span>{" "}
                </span>
                <Ratings />
                <span className={cx("text-muted")}>{data?.description}</span>
                <span className={cx("text-size")}>Size</span>
                <div className={cx("size-list")}>
                  {data?.size &&
                    data?.size.map((item: any) => {
                      return (
                        <div
                          key={item}
                          className={cx("size-item", { active: size === item })}
                          style={{
                            ...(size === item ? { color: "white" } : {}),
                          }}
                          onClick={() => setSize(item)}
                        >
                          {item}
                        </div>
                      );
                    })}
                </div>
                <span className={cx("text-color")}>Color</span>
                <div className={cx("color-container")}>
                  {data?.color &&
                    data?.color.map((item: any) => (
                      <div
                        key={item}
                        style={{
                          backgroundColor: item,
                          ...(color === item
                            ? { border: "2px solid red" }
                            : {}),
                        }}
                        className={cx("color-item", { active: color === item })}
                        onClick={() => handleAddColor(item)}
                      >
                        {/* {item} */}
                      </div>
                    ))}
                </div>
                <div className={cx("product-list-button")}>
                  <div className={cx("product-list-quantity")}>
                    <button onClick={handleDecrease}>-</button>
                    <span>{quantity}</span>
                    <button onClick={handleIncrease}>+</button>
                  </div>
                  <button
                    className={cx("btn-add")}
                    onClick={() => {
                      handleAddToCart(data?.id);
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
                <div className={cx("border-style")}></div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductList;
