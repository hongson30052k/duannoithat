import logo from "./img/logo.svg";
import img from "./img/img.svg";
import img1 from "./img/img1.svg";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { fetchGetUserLogin } from "../../store/slices/UserLoginSlice";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);
const Header = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.userState
  );
  const userId = useSelector(
    (state: RootState) => state.UserLoginState.idUserProduct
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchGetUserLogin());
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [isAuthenticated]);
  const DrawerList = (
    <Box
      sx={{
        width: 300,
        height: "100%",
        backgroundColor: "#f4f4f4",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <Typography sx={{ color: "black", fontSize: "20px" }}>
              Home
            </Typography>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/shop">
            <Typography sx={{ color: "black", fontSize: "20px" }}>
              Shop
            </Typography>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin">
            <Typography sx={{ color: "black", fontSize: "20px" }}>
              Admin
            </Typography>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <div className={cx("header")}>
        <div className={cx("menu-icon")} onClick={toggleDrawer(true)}>
          <MenuIcon style={{ fontSize: "40px" }} />
        </div>
        <img src={logo} alt="logo" />
        <nav className={cx("nav-bar")}>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/admin">Admin</Link>
        </nav>
        <div className={cx("nav-right")}>
          {isAuthenticated ? (
            <Link to="/profile" className={cx("img-profile")}>
              {userId.map((user: any) => {
                return <img src={user.img} alt={user.myname} className="img" />;
              })}
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={() =>
                toast.error("bạn chưa đăng nhập vui lòng đăng nhập")
              }
            >
              <img src={img} />
            </Link>
          )}
          <Link to="/shopping" className={cx("img-order")}>
            <img src={img1} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
