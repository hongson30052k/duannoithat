import styles from "./CardSideBar.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkeds,
  fetchProductOptions,
  getIdProductOption,
  searchStatus,
  setStatusCheck,
} from "../../../../store/slices/CartProductSlice";
import { priceFilter, PriceFilter } from "./priceFilter";
import SearchInput from "../SearchInput/SearchInput";
import { RootState } from "../../../../store/store";

// Định nghĩa kiểu dữ liệu cho các sản phẩm tìm kiếm

const cx = classNames.bind(styles);

const CardSideBar = () => {
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [menu, setMenu] = useState<{ id: number; name: string }[]>([]);
  const [checkedValue, setCheckedValue] = useState<number>(0);
  const { productOptionId } = useSelector(
    (state: RootState) => state.cartProductState
  );

  // hàm kiểm tra đã checked chưa và lấy giá trị checked
  const handleChangeValue = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;
    setCheckedValue((prev) => {
      const isChecked = checked ? Number(value) : 0;
      if (prev === isChecked) {
        return 0;
      } else {
        dispatch(checkeds({ isChecked, checked }));
        return isChecked;
      }
    });
    await dispatch(setStatusCheck(null));
  };
  // hàm lấy giá trị index khi click vào menu category
  const onClickMenu = async (index: number) => {
    setActiveIndex(index);
    await dispatch(getIdProductOption(index));
  };
  // hàm gọi api category
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: any = await dispatch(fetchProductOptions());
        const menus = res.payload || [];
        setMenu(menus);
      } catch (error) {
        console.error("Error fetching product options:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className={cx("sidebar-shop")}>
      {/* tìm kiếm khi focus vào ô input và click button tìm kiếm show product */}
      <SearchInput />
      {/* tìm kiếm dựa trên category*/}
      <span className={cx("sidebar-title")}>Danh sách tìm kiếm</span>
      <div key={0}>
        <span
          className={cx("sidebar-item", {
            active: productOptionId === 0,
          })}
          onClick={() => onClickMenu(0)}
        >
          TẤT CẢ SẢN PHẨM
        </span>
      </div>
      {menu.map((item) => (
        <div key={item.id}>
          <span
            onClick={() => onClickMenu(item.id)}
            className={cx("sidebar-item", {
              active: productOptionId === item.id,
            })}
          >
            {item.name}
          </span>
        </div>
      ))}
      <span className={cx("sidebar-title-filter")}>BỘ LỌC TÌM KIẾM</span>
      {/* tìm kiếm dựa trên giá*/}
      <div className={cx("price-filter")}>
        {priceFilter.map((item: PriceFilter) => (
          <div key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={checkedValue === item.id}
                onChange={handleChangeValue}
                value={item.id}
              />
              {item.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSideBar;
