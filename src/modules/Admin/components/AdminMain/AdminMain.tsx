import { Box } from "@mui/material";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminContent from "../AdminContent/AdminContent";
import styles from "./AdminMain.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const AdminMain = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <div className={cx("admin-header")}>
        <AdminHeader />
      </div>
      <AdminContent />
    </Box>
  );
};

export default AdminMain;
