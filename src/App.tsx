import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import ProductPage from "./pages/Product/ProductPage";
import ShopPage from "./pages/Shop/ShopPage";
import SignUpPage from "./pages/SignUp/SignUpPage";
import LoginPage from "./pages/Login/LoginPage";
import AdminPage from "./pages/Admin/AdminPage";
import UserLoginPage from "./pages/UserLogin/UserLoginPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUserFromLocalStorage } from "./store/slices/UserSlice";
import OrderPagePage from "./pages/CheckoutPage/CheckoutPage";
import ShoppingOrderPage from "./pages/ShoppingOrder.tsx/ShoppingOrderPage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    console.log(userFromLocalStorage, "userFromLocalStorage");
    if (userFromLocalStorage) {
      dispatch(setUserFromLocalStorage(JSON.parse(userFromLocalStorage)));
    }
  }, [dispatch]);
  // useEffect(() => {
  //   alert(
  //     `chào mừng đến với project của mình, kênh project của mình là kênh xây về bán đồ nột thất.
  //   trang web của mình sẽ có 2 chức năng chính về admin và user.
  //   - admin sẽ quản lí tài khoản user, quản lí các đơn hàng của user và các chức năng thêm xóa sửa các sản phẩm trong product
  //   - tài khoản admin: username: hongson, password: 123456
  //   - user sẽ quản lí tài khoản mình, quản lí các đơn hàng của mình và các chức năng thêm xoá sửa các sản phẩm trong giỏ hàng
  //   - tài khoản user: username: taikhoan1, password: 123456
  //   `
  //   );
  // }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/userLogin" element={<UserLoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/order" element={<OrderPagePage />} />
        <Route path="/shopping" element={<ShoppingOrderPage />} />
      </Routes>
    </div>
  );
}

export default App;
