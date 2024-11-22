import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";

const WithAuth = (WrappedComponent: React.FC<any>) => {
  const AuthHOC: React.FC<any> = (props) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector(
      (state: RootState) => state.userState
    );
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    console.log(isAuthenticated, "isAuthenticated");
    useEffect(() => {
      if (isAuthenticated && !user.isAdmin) {
        navigate("/shopping");
      } else if (isAuthenticated && user.isAdmin) {
        alert("Bạn là admin không có chức năng mua sản phẩm");
        navigate("/");
      } else if (!isAuthenticated) {
        alert("bạn chưa đăng nhập vui lòng đăng nhập");
        navigate("/login");
      }
    }, [isAuthenticated, navigate]);
    return isAuthenticated && !user.isAdmin ? (
      <WrappedComponent {...props} />
    ) : null;
  };

  return AuthHOC;
};

export default WithAuth;
