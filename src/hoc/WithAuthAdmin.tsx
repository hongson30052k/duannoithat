import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WithAuthAdmin = (WrappedComponent: React.FC) => {
  const AuthHOC: React.FC<any> = (props) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    useEffect(() => {
      if (user.isAdmin) {
        navigate("/admin");
      } else {
        alert("Trang này dành cho Admin! bạn không có quyền truy cập");
        navigate("/");
      }
    }, [user.isAdmin]);

    return user.isAdmin ? <WrappedComponent {...props} /> : null;
  };

  return AuthHOC;
};

export default WithAuthAdmin;
