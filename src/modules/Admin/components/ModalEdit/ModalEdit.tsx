import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import styles from "./ModalEdit.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEditProduct,
  fetchGetImgProductId,
  fetchProductApi,
  setShowModalEdit,
} from "../../../../store/slices/CartProductSlice";
import FileBase from "react-file-base64";
import { Dialog } from "@mui/material";
const cx = classNames.bind(styles);

const ModalEdit: React.FC = () => {
  const isValidBase64Image = (base64: string) => {
    const regex = /^data:image\/(png|jpeg|jpg|gif|bmp|webp);base64,/;
    return regex.test(base64);
  };
  const idEdit = localStorage.getItem("productIdEdit");
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  const { cardImg } = useSelector((state: any) => state.cartProductState);
  const [imgEditProduct, setImgEditProduct] = useState<any>(null);
  const [error, setError] = useState<any>("");
  const data = {
    ...product,
    ...cardImg,
  };
  console.log(data, "data..................");
  const formik: any = useFormik({
    initialValues: {
      name: data?.name,
      discounted_price: data?.discounted_price,
      original_price: data?.original_price,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lồn nhập tên sản phẩm"),
      discounted_price: Yup.number().required("Vui lồn nhập giá sản phẩm"),
      original_price: Yup.number().required("Vui lồn nhập giá sản phẩm"),
    }),
    onSubmit: (values) => {
      const id = data?.id;
      const value = {
        id: id,
        name: values.name,
        discounted_price: values.discounted_price,
        original_price: values.original_price,
      };
      dispatch(fetchEditProduct({ id, value }));
      dispatch(setShowModalEdit(false));
      alert("Chỉnh Sửa Thông Tin Thành Cống");
    },
  });
  const handleEditImage = (files: { base64: string }) => {
    if (!isValidBase64Image(files.base64)) {
      setError("File bạn chọn không phải là hình ảnh hợp lệ.");
      setImgEditProduct(null);
      return;
    }
    setImgEditProduct(files.base64);
    setError("");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchGetImgProductId(idEdit));
        const data: any = await dispatch(fetchProductApi(idEdit));
        setProduct(data?.payload);
        if (data?.payload) {
          formik.setValues({
            name: data?.payload?.name,
            discounted_price: data?.payload?.discounted_price,
            original_price: data?.payload?.original_price,
          });
        }
      } catch (error) {}
    };
    fetchData();
  }, []);

  const handleClose = () => {
    dispatch(setShowModalEdit(false));
  };

  return (
    <Dialog onClose={handleClose} open>
    <div className={cx("form-container")}>
      <h2>Chỉnh Sửa Thông Tin Sản Phẩm</h2>
      <form className={cx("form-group")} onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Tên sản phẩm</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formik.values.name}
          className={cx("form-control")}
          placeholder="Nhập tên sản phẩm"
          onChange={formik.handleChange}
        />
        {error && <div className={cx("error-message")}>{error}</div>}
        <label htmlFor="original_price">Giá sản phẩm</label>
        <input
          type="text"
          id="original_price"
          name="original_price"
          className={cx("form-control")}
          placeholder="Nhập giá sản phẩm - giá gốc"
          value={formik.values.original_price}
          onChange={formik.handleChange}
        />
        {error && <div className={cx("error-message")}>{error}</div>}
        <div className={cx("form-group")}>
          <label htmlFor="discounted_price">Giá sản phẩm sau khi giảm</label>
          <input
            type="text"
            id="discounted_price"
            name="discounted_price"
            className={cx("form-control")}
            placeholder="Nhập mật khẩu của bạn"
            value={formik.values.discounted_price}
            onChange={formik.handleChange}
          />
          {error && <div className={cx("error-message")}>{error}</div>}
        </div>
        <FileBase type="file" multiple={false} onDone={handleEditImage} />
        {imgEditProduct ? (
          <img
            src={imgEditProduct}
            alt="Uploaded"
            style={{ width: "100px", height: "auto", marginTop: "10px" }}
          />
        ) : (
          <img
            src={data?.img}
            alt="Uploaded"
            style={{ width: "100px", height: "auto", marginTop: "10px" }}
          />
        )}

        <div className="form-group" style={{ marginTop: "20px" }}>
          <button type="submit" className={cx("submit-button")}>
            Lưu Thay Đổi
          </button>
          <button
            onClick={() => dispatch(setShowModalEdit(false))}
            className={cx("submit-button")}
          >
            Hủy Thay Đổi
          </button>
        </div>
      </form>
    </div>
    </Dialog>
  );
};

export default ModalEdit;
