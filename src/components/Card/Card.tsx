import FavoriteIcon from "@mui/icons-material/Favorite";
import CompareArrowsSharpIcon from "@mui/icons-material/CompareArrowsSharp";
import img from "./img/img.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetImgProductId,
  fetchProductApi,
  getProductId,
} from "../../store/slices/CartProductSlice";
import styles from "./Card.module.scss";
import classNames from "classnames/bind";
import { fetchCreateProductId } from "../../store/slices/UserProductSlice";
import { calculateDiscountPercentage } from "../../utils/calculateDiscountPercentage/calculateDiscountPercentage";

const cx = classNames.bind(styles);

const Card = ({ data }: any) => {
  const user: any = JSON.parse(localStorage.getItem("user") || "{}");
  const { isAuthenticated } = useSelector((state: any) => state.userState);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onAddToCart = async (id: any) => {
    if (user.isAdmin && isAuthenticated) {
      alert("bạn là tài khoản admin không thể thêm sản phẩm vào giỏ hàng");
      return;
    } else if (!user.isAdmin && isAuthenticated) {
    } else if (!isAuthenticated) {
      alert("bạn chưa đăng nhập vui lòng đăng nhập");
      return;
    }
    const res: any = await dispatch(fetchCreateProductId(id));
    const result = res.payload;
    if (typeof result === "string") {
      alert(result);
    } else {
      alert("Đã thêm sản phẩm vào giỏ hàng");
    }
  };
  const onGetProduct = (id: any) => {
    dispatch(getProductId(id));
    localStorage.setItem("productId", id);
  };
  const discounted_price = Number(data.discounted_price);
  const original_price = Number(data.original_price);
  const formatDiscountPrice = discounted_price?.toLocaleString();
  const formatOriginalPrice = original_price?.toLocaleString();
  return (
    <>
      {data && (
        <div className={cx("card")}>
          {data.discounted_price > 0 && (
            <div className={cx("card-percent-discount")}>
              <span className={cx("text-percent-discount")}>
                {calculateDiscountPercentage(
                  data.discounted_price,
                  data.original_price
                )}
                %
              </span>
            </div>
          )}
          <img src={data.img} alt="" onClick={() => onGetProduct(data.id)} />
          <div
            className={cx("card-info")}
            onClick={() => {
              onGetProduct(data.id);
              navigate(`/product/${data.id}`);
            }}
          >
            <span className={cx("card-title")}>{data.name}</span>
            <span className={cx("card-text")}>{data.description}</span>
            <div className={cx("card-price-container")}>
              <span className={cx("card-price")}>
                {formatDiscountPrice} vnđ
              </span>
              <span className={cx("card-price-discount")}>
                {formatOriginalPrice} vnđ
              </span>
            </div>
          </div>
          <div className={cx("card-button")}>
            <div className={cx("btn")} onClick={() => onAddToCart(data.id)}>
              ADD TO CART
            </div>
            <div className={cx("card-icon")}>
              <Link to="/" className={cx("card-button-icon")}>
                <FavoriteIcon />
                <span className={cx("card-button-icon-text")}>Like</span>
              </Link>
              <Link to="/" className={cx("card-button-icon")}>
                <CompareArrowsSharpIcon />
                <span className={cx("card-button-icon-text")}>Share</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
