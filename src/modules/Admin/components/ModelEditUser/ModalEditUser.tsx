import * as Yup from "yup";
import { useFormik } from "formik";
import styles from "./ModalEditUser.module.scss";
import classNames from "classnames/bind";
import { Dialog } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  fetchEditUserImgProfile,
  fetchEditUserProfile,
  fetchGetUserId,
  fetchGetUserImg,
} from "../../../../store/slices/UserSlice";
import { useEffect, useState } from "react";
const cx = classNames.bind(styles);

const ModalEditUser = ({ setShows, id }: any) => {
  const [initialValues, setInitialValues] = useState<any>({
    username: "",
    phone: "",
    address: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user image and user details concurrently
        const res: any = await dispatch(fetchGetUserImg(id));
        const res1: any = await dispatch(fetchGetUserId(id));
        setInitialValues({
          username: res?.payload?.myname || "",
          phone: res1?.payload?.phone || "",
          address: res1?.payload?.address || "",
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, dispatch]);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Username is required"),
      phone: Yup.string().required("Phone is required"),
      address: Yup.string().required("Address is required"),
    }),
    onSubmit: async (values) => {
      console.log(id, "id");
      const value = {
        phone: values.phone,
        address: values.address,
      };
      const value1 = {
        myname: values.username,
      };
      await dispatch(fetchEditUserProfile({ id, value }));
      await dispatch(fetchEditUserImgProfile({ id, value1 }));
      setShows(false);
    },
    enableReinitialize: true,
  });

  const handleClose = (setShows: any) => setShows(false);

  return (
    <Dialog onClose={handleClose} open={setShows}>
      <div className={cx("modal")}>
        <div className={cx("modal-content")}>
          <h2>Sửa thông tin người dùng</h2>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="username">Tên người dùng:</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={formik.handleChange}
              value={formik.values?.username}
              required
            />
            <br />
            <br />

            <label htmlFor="address">Địa chỉ:</label>
            <input
              type="text"
              id="address"
              name="address"
              onChange={formik.handleChange}
              value={formik.values.address}
              required
            />
            <br />
            <br />

            <label htmlFor="phone">Số điện thoại:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
              required
            />
            <br />
            <br />
            <button
              className={cx("closes")}
              onClick={() => {
                setShows(false);
              }}
            >
              Hủy thay đổi
            </button>
            <button type="submit">Lưu thay đổi</button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalEditUser;
