import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import ProductPage from "./pages/Product/ProductPage";
import ShopPage from "./pages/Shop/ShopPage";
import SignUpPage from "./pages/SignUp/SignUpPage";
import LoginPage from "./pages/Login/LoginPage";
import AdminPage from "./pages/Admin/AdminPage";
import UserLoginPage from "./pages/UserLogin/UserLoginPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchGetUser,
  setUserFromLocalStorage,
} from "./store/slices/UserSlice";
import OrderPagePage from "./pages/CheckoutPage/CheckoutPage";
import ShoppingOrderPage from "./pages/ShoppingOrder.tsx/ShoppingOrderPage";
import { RootState } from "./store/store";
import "./App.css";

function App() {
  const [dataUser, setDataUser] = useState([]);
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.userState
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    console.log(userFromLocalStorage, "userFromLocalStorage");
    if (userFromLocalStorage) {
      dispatch(setUserFromLocalStorage(JSON.parse(userFromLocalStorage)));
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: any = await dispatch(fetchGetUser());
        console.log(res?.payload);
        setDataUser(res?.payload);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      {!isAuthenticated && (
        <table className="tableShowUser">
          <tr>
            <th>Username</th>
            <th>PassWord</th>
            <th>Trạng thái</th>
          </tr>
          {dataUser &&
            dataUser?.map((user: any) => {
              return (
                <tr>
                  <td>{user?.username}</td>
                  <td>{user?.password}</td>
                  <td>{user?.isAdmin ? "Admin" : "User"}</td>
                  <br />
                </tr>
              );
            })}
        </table>
      )}
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
