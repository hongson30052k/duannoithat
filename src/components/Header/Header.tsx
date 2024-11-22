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
import { LinearProgress } from "@mui/material";

const cx = classNames.bind(styles);
const Header = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.userState
  );
  const userId = useSelector(
    (state: RootState) => state.UserLoginState.idUserProduct
  );
  useEffect(() => {
    dispatch(fetchGetUserLogin());
    setLoading(false);
  }, [isAuthenticated]);

  return (
    <>
      <div className={cx("header")}>
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
            <Link to="/login">
              <img src={img} />
            </Link>
          )}
          <Link to="/shopping">
            <img src={img1} />
          </Link>
          <Link to="/cart">
            <FavoriteBorderIcon className={cx("icon")} />
          </Link>
        </div>
      </div>
      {/* {loading && <LinearProgress />} */}
    </>
  );
};

export default Header;
