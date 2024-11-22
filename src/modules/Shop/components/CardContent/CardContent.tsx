import { useDispatch, useSelector } from "react-redux";
import Card from "../../../../components/Card/Card";
import PaginationItem from "../../../../components/Pagination/Pagination";
import styles from "./CardContent.module.scss";
import classNames from "classnames/bind";
import { RootState } from "../../../../store/store";
import { useCallback, useEffect, useState } from "react";
import {
  fetchCartProductAPI,
  fetchCartProductAPIPage,
  fetchCartProductAPIPageCategory,
  fetchCartProductTotalCategory,
  fetchGetPriceFrom1mto5mCateGory,
  fetchGetPriceFrom1mto5mPage,
  fetchGetPriceOver5mCategory,
  fetchGetPriceOver5mPage,
  fetchGetPriceUnder1000k,
  fetchGetPriceUnder1000kCateGory,
  fetchGetPriceUnder1000kPage,
  fetchSearchProducts,
  fetchSearchProductsPage,
  setLoading,
} from "../../../../store/slices/CartProductSlice";
import { Box, LinearProgress } from "@mui/material";
const cx = classNames.bind(styles);

const CardContent = () => {
  const limit = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();
  const [card, setCard] = useState<any[]>([]);
  const {
    cartImg,
    productOptionId,
    checkedPrice,
    checked,
    searchInputValue,
    search,
    searchValue,
  } = useSelector((state: RootState) => state.cartProductState);
  // console.log(productOptionId, "ppppppppppppp");
  // Lấy dữ liệu sản phẩm tìm kiếm
  console.log(
    search,
    "search............................................................"
  );
  console.log(
    searchInputValue,
    "searchValue............................................................"
  );
  const fetchDataSearch = async () => {
    try {
      await dispatch(setLoading(true));
      const resTotal: any = await dispatch(
        fetchSearchProducts({ searchValue })
      );
      console.log(resTotal, "resTotal");
      console.log(resTotal, "resTotal11111111111111111111111111111");
      setTotalPages(resTotal?.payload?.length);
      const Cards: any = await dispatch(
        fetchSearchProductsPage({
          value: searchValue,
          currentPage,
          limit,
        })
      );
      setCard(Cards?.payload);
      await dispatch(setLoading(false));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // Lấy dữ liệu sản phẩm category
  const fetchData = async () => {
    try {
      switch (productOptionId) {
        case 0: {
          if (checked) {
            switch (checkedPrice) {
              case 1: {
                await dispatch(setLoading(true));
                const resTotal: any = await dispatch(fetchGetPriceUnder1000k());
                setTotalPages(resTotal?.payload?.length);
                const Cards: any = await dispatch(
                  fetchGetPriceUnder1000kPage({ currentPage, limit })
                );
                setCard(Cards?.payload);
                await dispatch(setLoading(false));
                break;
              }
              case 2: {
                await dispatch(setLoading(true));
                const CardPage: any = await dispatch(
                  fetchGetPriceFrom1mto5mPage({ currentPage, limit })
                );
                setTotalPages(CardPage?.payload?.total);
                setCard(CardPage?.payload?.products);
                await dispatch(setLoading(false));
                break;
              }
              case 3:
                {
                  await dispatch(setLoading(true));
                  const CardPage: any = await dispatch(
                    fetchGetPriceOver5mPage({ currentPage, limit })
                  );
                  setTotalPages(CardPage?.payload?.total);
                  setCard(CardPage?.payload.products);
                  await dispatch(setLoading(false));
                }
                break;
              default:
                {
                  console.log("error");
                }
                break;
            }
          } else {
            await dispatch(setLoading(true));
            const resTotal: any = await dispatch(fetchCartProductAPI());
            setTotalPages(resTotal?.payload?.length);
            const Cards: any = await dispatch(
              fetchCartProductAPIPage({
                currentPage,
                limit,
              })
            );
            setCard(Cards?.payload);
            await dispatch(setLoading(false));
          }
          break;
        }
        default: {
          if (checked) {
            switch (checkedPrice) {
              case 1: {
                await dispatch(setLoading(true));
                const Cards: any = await dispatch(
                  fetchGetPriceUnder1000kCateGory({
                    productOptionId,
                    currentPage,
                    limit,
                  })
                );
                setTotalPages(Cards?.payload?.total);
                setCard(Cards?.payload?.products);
                await dispatch(setLoading(false));
                break;
              }
              case 2: {
                await dispatch(setLoading(true));
                const Cards: any = await dispatch(
                  fetchGetPriceFrom1mto5mCateGory({
                    productOptionId,
                    currentPage,
                    limit,
                  })
                );
                setTotalPages(Cards?.payload?.total);
                setCard(Cards?.payload?.products);
                await dispatch(setLoading(false));
                break;
              }
              case 3:
                {
                  await dispatch(setLoading(true));
                  const Cards: any = await dispatch(
                    fetchGetPriceOver5mCategory({
                      productOptionId,
                      currentPage,
                      limit,
                    })
                  );
                  setTotalPages(Cards?.payload?.total);
                  setCard(Cards?.payload?.products);
                  await dispatch(setLoading(false));
                }
                break;
              default:
                console.log("Error fetching data:");
                break;
            }
          } else {
            await dispatch(setLoading(true));
            const resTotal: any = await dispatch(
              fetchCartProductTotalCategory({ productOptionId })
            );
            setTotalPages(resTotal?.payload?.length);
            const Cards: any = await dispatch(
              fetchCartProductAPIPageCategory({
                productOptionId,
                currentPage,
                limit,
              })
            );
            setCard(Cards?.payload);
            await dispatch(setLoading(false));
          }
          break;
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // Show sản phẩm theo tìm kiếm trên thanh input khi click
  useEffect(() => {
    if (search === "search") {
      fetchDataSearch();
    }
  }, [searchValue, currentPage]);
  // set laị curentPage = 1 khi click vào nút tìm kiếm
  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue]);
  // set laị curentPage = 1 khi click vào nút tìm kiếm hoặc khi click vào category
  useEffect(() => {
    setCurrentPage(1);
  }, [productOptionId]);
  // lấy sản phẩm khi thay đổi category
  useEffect(() => {
    if (search === null) {
      fetchData();
    }
  }, [productOptionId, currentPage]);
  useEffect(() => {
    if (search === null) {
      fetchData();
    }
  }, [checked, checkedPrice, currentPage]);
  // hàm thay đổi currentPage về 1 khi click vào mỗi check
  useEffect(() => {
    setCurrentPage(1);
  }, [checkedPrice]);

  // hàm này dùng để show sp theo category hoặc tìm kiếm
  useEffect(() => {
    if (search === "search") {
      fetchDataSearch();
    } else {
      // Nếu không trong chế độ tìm kiếm, lấy sản phẩm theo category
      fetchData();
    }
  }, [search]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const data = Array.isArray(card)
    ? card.map((item) => {
        const item1 = cartImg?.find((item2) => item2?.id === item?.id);
        return item1 ? { ...item, ...item1 } : item;
      })
    : [];
  return (
    <>
      <div className={cx("main-cart")}>
        <div className={cx("main-home-cart-content-show")}>
          {data &&
            data?.map((data, index) => {
              return <Card key={index} data={data} />;
            })}
        </div>
        <PaginationItem
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          limit={limit}
        />
      </div>
    </>
  );
};

export default CardContent;
