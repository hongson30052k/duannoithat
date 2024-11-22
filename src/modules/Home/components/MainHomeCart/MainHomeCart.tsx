import { useDispatch, useSelector } from "react-redux";
import Card from "../../../../components/Card/Card";
import { RootState } from "../../../../store/store";
import styles from "./MainHomeCart.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import {
  fetchCartProductAPI,
  fetchGetImgProduct,
} from "../../../../store/slices/CartProductSlice";
import { Box, CircularProgress } from "@mui/material";
import { loadavg } from "os";

const cx = classNames.bind(styles);

const MainHomeCart = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(8);
  const { card, cartImg } = useSelector(
    (state: RootState) => state.cartProductState
  );
  console.log(cartImg, "cartImg");
  console.log(card, "card");
  const data = card?.map((item) => {
    const item1 = cartImg?.find((item2) => item2?.id === item?.id);
    return item1 ? { ...item, ...item1 } : item;
  });
  console.log(data, "data");
  const showMore = () => {
    setCurrentIndex((prevIndex) => prevIndex + 8);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchCartProductAPI());
        await dispatch(fetchGetImgProduct());
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className={cx("main-home-cart")}>
      <span className={cx("title")}>Our Products</span>
      <div className={cx("main-home-cart-content")}>
        {data &&
          data
            .slice(0, currentIndex)
            .map((data) => <Card key={data.id} data={data} />)}
      </div>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        {loading ? <CircularProgress /> : <div></div>}
      </Box>
      <button className={cx("show-all")} onClick={showMore}>
        Show More
      </button>
    </div>
  );
};

export default MainHomeCart;
