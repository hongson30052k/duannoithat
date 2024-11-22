import { Box, LinearProgress } from "@mui/material";
import CardContent from "../CardContent/CardContent";
import SideBar from "../CardSidebar/CardSideBar";
import styles from "./ShopCard.module.scss";
import classNames from "classnames/bind";
import { RootState } from "../../../../store/store";
import { useSelector } from "react-redux";
const cx = classNames.bind(styles);

const CardMain = () => {
  const { loading } = useSelector((state: RootState) => state.cartProductState);
  return (
    <>
      <Box style={{ width: "100%", display: "block" }}>
        {loading && (
          <LinearProgress
            color="secondary"
            style={{ width: "100%", height: "5px" }}
          />
        )}
      </Box>
      <div className={cx("shop-card")}>
        <SideBar />
        <CardContent />
      </div>
    </>
  );
};

export default CardMain;
