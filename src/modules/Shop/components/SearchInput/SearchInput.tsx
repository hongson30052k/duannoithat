import { useDispatch, useSelector } from "react-redux";
import styles from "./SearchInput.module.scss";
import classNames from "classnames/bind";
import { useEffect, useMemo, useState } from "react";
import {
  fetchGetImgProduct,
  fetchSearchProducts,
  fetchSearchProductsView,
  getIdProductOption,
  search,
  searchInputValue,
  searchStatus,
} from "../../../../store/slices/CartProductSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../store/store";
import { Box, CircularProgress, LinearProgress } from "@mui/material";
const cx = classNames.bind(styles);

interface Product {
  id: number;
  name: string;
  img: string;
  discounted_price: number;
  original_price: number;
}
const SearchInput = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [inputValueCart, setInputValueCart] = useState<string>("");
  const [cardSearch, setCardSearch] = useState<Product[]>([]);
  const navigate = useNavigate();
  const { cartImg } = useSelector((state: RootState) => state.cartProductState);
  const [loading, setLoading] = useState(false);
  const handleInputValue = async () => {
    setIsModalOpen(false);
    setInputValueCart("");
    dispatch(searchStatus("search"));
    dispatch(search(inputValueCart));
    dispatch(getIdProductOption(null));
  };

  //Nhận value của ô input tìm kiếm
  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: any = event.target.value;
    setInputValueCart(value);
    dispatch(searchInputValue(value));
  };
  // chuyển đến trang product dựa trên id nhận vào
  const handleChangeProduct = (id: number) => {
    localStorage.setItem("productId", id.toString());
    navigate("/product/" + id);
  };
  // Lấy dữ liệu sản phẩm tìm kiếm
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res: any = await dispatch(
          fetchSearchProductsView({ inputValueCart })
        );
        await dispatch(fetchGetImgProduct());
        setCardSearch(res.payload);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [inputValueCart]);
  const dataSearch = useMemo(() => {
    return cardSearch.map((item: Product) => {
      const item1 = cartImg?.find((item2) => item2?.id === item?.id);
      return item1 ? { ...item, ...item1 } : item;
    });
  }, [cardSearch, cartImg]);
  return (
    <>
      <div className={cx("search-container")}>
        <input
          type="text"
          className={cx("search-box")}
          placeholder="Tìm kiếm sản phẩm..."
          id="searchInput"
          onFocus={() => setIsModalOpen(true)}
          onChange={handleChangeSearch}
          value={inputValueCart}
        />
        <button className={cx("search-button")} onClick={handleInputValue}>
          Tìm kiếm
        </button>
        {isModalOpen && (
          <div className={cx("search-dropdown")}>
            <ul>
              {dataSearch.length > 0 &&
                dataSearch.map((item: Product) => {
                  const discounted_price = Number(item.discounted_price);
                  const original_price = Number(item.original_price);
                  const formatDiscountPrice = !isNaN(discounted_price)
                    ? discounted_price.toLocaleString()
                    : "Không có giá";
                  const formatOriginalPrice = !isNaN(original_price)
                    ? original_price.toLocaleString()
                    : "Không có giá";
                  return (
                    <>
                      <div
                        key={item.id}
                        className={cx("search-list")}
                        onClick={() => handleChangeProduct(item.id)}
                      >
                        <img
                          src={item.img}
                          alt=""
                          style={{ width: "50px", height: "50px" }}
                        />
                        <div className={cx("search-item")}>
                          <span>{item.name}</span>
                          <div>
                            <span>{formatDiscountPrice}</span>
                            <span
                              className={cx("original-price")}
                              style={{
                                textDecoration: "line-through",
                                marginLeft: "5px",
                              }}
                            >
                              {formatOriginalPrice}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
            </ul>
          </div>
        )}
      </div>
      {loading ? (
        <Box style={{ width: "100%", display: "block" }}>
          <CircularProgress />
        </Box>
      ) : null}
    </>
  );
};

export default SearchInput;
