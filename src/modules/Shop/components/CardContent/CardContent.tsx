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
import { Box, Grid, Grid2 } from "@mui/material";
const cx = classNames.bind(styles);

const CardContent = () => {
  let limit = 8;
  if (window.innerWidth <= 768) {
    limit = 2;
  } else if (window.innerWidth <= 1024) {
    limit = 4;
  } else if (window.innerWidth <= 1280) {
    limit = 6;
  } else {
    limit = 8;
  }
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();
  const [card, setCard] = useState<any[]>([]);
  const {
    cartImg,
    productOptionId,
    checkedPrice,
    checked,
    search,
    searchValue,
  } = useSelector((state: RootState) => state.cartProductState);
  // Lấy dữ liệu sản phẩm tìm kiếm
  const fetchDataSearch = async (payload: any) => {
    try {
      await dispatch(setLoading(true));
      const resTotal: any = await dispatch(
        fetchSearchProducts({ searchValue: payload?.search })
      );

      const Cards: any = await dispatch(
        fetchSearchProductsPage({
          value: payload?.search,
          currentPage: payload?.currentPage,
          limit: payload?.limit,
        })
      );
      setCard(Cards?.payload);
      setTotalPages(resTotal?.payload?.length);
      await dispatch(setLoading(false));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // Lấy dữ liệu sản phẩm category
  const fetchData = async (payload: any) => {
    const productOptionId = payload?.productOptionId;
    const checkedPrice = payload?.checkedPrice;
    const checked = payload?.checked;
    const currentPage = payload?.currentPage;
    const limit = payload?.limit;
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
            const Cards: any = await dispatch(
              fetchCartProductAPIPage({
                currentPage,
                limit,
              })
            );
            setCard(Cards?.payload);
            setTotalPages(resTotal?.payload?.length);
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

  useEffect(() => {
    console.log("searchValue", searchValue);
    console.log("search", search);
    console.log("productOptionId", productOptionId);

    if (search === "search" && productOptionId === null) {
      const payload = {
        search: searchValue,
        currentPage: 1,
        limit: limit,
      };
      fetchDataSearch(payload);
    } else {
      if (productOptionId !== null) {
        const payload = {
          productOptionId: productOptionId,
          currentPage: 1,
          limit: limit,
          checked,
          checkedPrice,
        };
        fetchData(payload);
        setCurrentPage(1);
      }
    }
  }, [searchValue, search, productOptionId, checked, checkedPrice]);

  const handlePageChange = (page: number) => {
    if (search === "search" && productOptionId === null) {
      const payload = {
        search: searchValue,
        currentPage: page,
        limit: limit,
      };
      fetchDataSearch(payload);
      setCurrentPage(page);
    } else {
      if (productOptionId !== null) {
        const payload = {
          productOptionId: productOptionId,
          currentPage: page,
          limit: limit,
          checked,
          checkedPrice,
        };
        fetchData(payload);
        setCurrentPage(page);
      }
    }
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
          {data.length > 0 &&
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
      {/* <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid2 container spacing={2}>
          {data.map((product, index) => (
            <Grid
              item
              xs={6} // 4 items on small screens (2 columns per row)
              sm={4} // 4 items on medium screens (3 columns per row)
              key={product.id}
            >
              <Box
                sx={{
                  border: "1px solid #ddd",
                  padding: 2,
                  textAlign: "center",
                }}
              >
                <Card key={index} data={data} />;
              </Box>
            </Grid>
          ))}
        </Grid2>
      </Box> */}
    </>
  );
};

export default CardContent;
