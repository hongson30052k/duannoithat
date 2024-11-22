import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import styles from "./ProfileEdit.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import {
  fetchEditUser,
  loginUser,
  logoutUser,
  setUserFromLocalStorage,
} from "../../../../store/slices/UserSlice";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);
const ProfileEdit = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isPassword, setIsPassword] = useState(false);
  const [newPasswords, setNewPassword] = useState("");
  const user1 = useSelector(
    (state: RootState) => state.UserLoginState.idUserProduct
  );
  const user2: any = useSelector(
    (state: RootState) => state.userState.userRender
  );
  const statusPw = useSelector(
    (state: RootState) => state.userState.statusPassword
  );
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.userState
  );

  const formik = useFormik({
    initialValues: {
      myname: "",
      phone: "",
      address: "",
      resetPassword: "",
      newPassword: "",
    },

    validationSchema: Yup.object().shape({
      resetPassword: Yup.string()
        .required("Password is required")
        .test(
          "len",
          "Nhập lại password cũ không đúng",
          (val: any) => val === user2.password
        ),
      newPassword: Yup.string()
        .required("Password is required")
        .test(
          "len",
          "Password mới trùng với Password cũ",
          (val: any) => val !== user2.password
        )
        .min(6, "Password phải có ít nhất 6 kí tự"),
    }),
    onSubmit: (values) => {
      const value = {
        myname: values.myname,
        phone: values.phone,
        address: values.address,
        resetPassword: values.resetPassword,
        newPassword: values.newPassword,
      };
    },
  });
  const changePassword = (e: any) => {
    e.preventDefault();
    setIsPassword(true);
    const id = user2.id;
    const resetPassword = formik.values.resetPassword;
    const newPassword = formik.values.newPassword;
    setNewPassword(newPassword);
    const value = {
      id: id,
      password: newPassword,
    };
    console.log(newPassword, "newPassword");
    if (isPassword) {
      if (
        resetPassword === user2.password &&
        newPassword !== user2.password &&
        newPassword !== "" &&
        newPassword.length >= 6
      ) {
        dispatch(fetchEditUser(value));
      } else {
        return;
      }
      formik.resetForm();
      if (statusPw) {
        setIsPassword(false);
      }
    }
  };
  const handleLogout = (e: any) => {
    e.preventDefault();
    setShowConfirm(true);
  };
  const handleConfirm = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <div>
      <form
        action=""
        className={cx("form-profile")}
        onSubmit={formik.handleSubmit}
      >
        {user1.map((item: any) => {
          return (
            <>
              <label htmlFor="" className={cx("label-profile")}>
                name
              </label>
              <input
                type="text"
                value={item.myname}
                className={cx("input-profile")}
              />
            </>
          );
        })}
        <label htmlFor="" className={cx("label-profile")}>
          phone
        </label>
        <input
          name="phone"
          type="text"
          value={user2.phone}
          onChange={formik.handleChange}
          className={cx("input-profile")}
        />

        <label htmlFor="" className={cx("label-profile")}>
          Address
        </label>
        <input
          type="text"
          value={user2.address}
          className={cx("input-profile")}
          onChange={formik.handleChange}
        />
        <label htmlFor="" className={cx("label-profile")}>
          PassWord
        </label>
        <input
          name="password"
          value={user2.password}
          className={cx("input-profile")}
        />
        {isPassword ? (
          <>
            <label htmlFor="" className={cx("label-profile")}>
              Nhập lại PassWord
            </label>
            <input
              name="resetPassword"
              value={formik.values.resetPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Nhập lại PassWord"
              type="text"
              className={cx("input-profile")}
            />
            {formik.touched.resetPassword && formik.errors.resetPassword ? (
              <span style={{ color: "red" }}>
                {formik.errors.resetPassword}
              </span>
            ) : null}
            <label htmlFor="" className={cx("label-profile")}>
              PassWord mới
            </label>
            <input
              className={cx("input-profile")}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="newPassword"
              value={formik.values.newPassword}
              type="text"
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div style={{ color: "red" }}>{formik.errors.newPassword}</div>
            ) : null}
          </>
        ) : null}
        <button className={cx("btn")} onClick={(e) => changePassword(e)}>
          {isPassword ? "xác nhận" : "Đổi Mật Khẩu"}
        </button>
        {isPassword ? (
          <button
            className={cx("btn")}
            style={{ marginLeft: 10 }}
            onClick={(e) => {
              e.preventDefault();
              setIsPassword(false);
            }}
          >
            Hủy
          </button>
        ) : null}
        <button className={cx("btn-logout")} onClick={(e) => handleLogout(e)}>
          Logout
        </button>
        {showConfirm ? (
          <div className={cx("confirmation-box")}>
            <div className={cx("confirmation-content")}>
              <p>Bạn có chắc chắn muốn đăng xuất?</p>
              <button onClick={handleConfirm}>Đồng ý</button>
              <button onClick={handleCancel}>Hủy</button>
            </div>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default ProfileEdit;
