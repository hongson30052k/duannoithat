import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddImgProduct,
  fetchAddToCart,
  fetchCartProductAPI,
  fetchCartProductAPIPage,
  fetchColor,
  fetchDeleteCart,
  fetchDeleteImgCart,
  fetchGetCountry,
  fetchGetImgProduct,
  fetchProductApi,
  fetchProductOptions,
  setShowModalEdit,
} from "../../../../store/slices/CartProductSlice";
import { RootState } from "../../../../store/store";
import styles from "./ProductManagement.module.scss";
import classNames from "classnames/bind";
import FileBase from "react-file-base64";
import { generateUUID2 } from "../../../../utils/GenerateldUIID/GenerateldUIID";
import ModalEdit from "../ModalEdit/ModalEdit";
import PaginationPageProduct from "../PaginationPageProduct/Pagination";
const cx = classNames.bind(styles);

const ProductManagement: React.FC = () => {
  const dispatch = useDispatch();
  const isValidBase64Image = (base64: string) => {
    const regex = /^data:image\/(png|jpeg|jpg|gif|bmp|webp);base64,/;
    return regex.test(base64);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgProduct, setImgProduct] = useState<any>(null);
  const [error, setError] = useState<any>("");
  const [showModal, setShowModal] = useState(false);
  const [dataDetial, setDataDetial] = useState<any>(null);
  const [size, setSize] = useState<any>([]);
  const [selectColor, setSelectColor] = useState<any>([]);
  const [valueManufacturer, setValueManufacturer] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [Card, setCard] = useState<any>([]);
  const limit = 5;
  const handleAddImage = (files: { base64: string }) => {
    if (!isValidBase64Image(files.base64)) {
      setError("File bạn chọn không phải là hình ảnh hợp lệ.");
      setImgProduct(null);
      return;
    }
    setImgProduct(files.base64);
    setError("");
  };
  const handleAddProduct = async (values: any) => {
    console.log(values, "values");
    const value = {
      id: values.id,
      img: imgProduct,
    };
    console.log(value, "value");
    if (!imgProduct) return;
    await dispatch(fetchAddImgProduct(value));
    await dispatch(fetchAddToCart(values));
    await dispatch(fetchCartProductAPI());
    setImgProduct(null);
  };
  const {
    card,
    cartImg,
    status,
    color,
    country,
    productOptions,
    ShowModalEdit,
  } = useSelector((state: RootState) => state.cartProductState);
  const onModalOpen = () => {
    setIsModalOpen(true);
  };
  console.log(card, "data");
  console.log(cartImg, "cartImg");
  const data = Card.map((item: any) => {
    const item1 = cartImg?.find((item2: any) => item2?.id === item?.id);
    return item1 ? { ...item, ...item1 } : item;
  });
  console.log(country, "country");
  const formik: any = useFormik({
    initialValues: {
      name: "",
      original_price: "",
      category: 1,
      frameTo: 0,
      frameFrom: 0,
      discounted_price: "",
      country: "",
      color: "",
      accessories: "",
      brandName: "",
      brandDescription: "",
      manufacturerName: "",
      manufacturerInfo: "",
      manufacturerProduct: "",
      inputDescription: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Vui lòng nhập tên sản phẩm"),
      original_price: Yup.string().required("Vui lòng nhập giá sản phẩm"),
      discounted_price: Yup.string().required("Vui lòng nhập giá sản phẩm"),
      category: Yup.number().required("Vui lòng chọn danh mục"),
    }),
    onSubmit: (values) => {
      if (!imgProduct) return;
      const value: any = {
        ...values,
        size: size,
        color: selectColor,
        manufacturerProducts: valueManufacturer,
        id: generateUUID2(),
      };
      handleAddProduct(value);
      console.log(value, "value");
      formik.resetForm();
      console.log(values);
    },
  });
  const handDelete = async (productId: string) => {
    console.log(productId);
    await dispatch(fetchDeleteCart(productId));
    await dispatch(fetchDeleteImgCart(productId));
    await dispatch(fetchCartProductAPI());
  };

  const handleEdit = (id: any) => {
    dispatch(setShowModalEdit(true));
    localStorage.setItem("productIdEdit", id);
  };
  const handleAddFrame = (e: any) => {
    e.preventDefault();

    if (formik.values.frameFrom && formik.values.frameTo) {
      const from = formik.values.frameFrom;
      const to = formik.values.frameTo;

      if (from < to) {
        const string: any = `${from}cm * ${to}cm`;
        setSize((preSize: any) => [...preSize, string]);
      } else {
        return (formik.errors.frameFrom =
          "Giá trị từ phải nhỏ hơn giá trị đến");
      }
    }
  };
  const handDeleteSize = (index: number) => {
    const updateSize = [...size];
    updateSize.splice(index, 1);
    setSize(updateSize);
  };
  const handAddColor = (e: any) => {
    e.preventDefault();
    if (formik.values.color) {
      const string: any = formik.values.color;
      setSelectColor((preSize: any) => [...preSize, string]);
    }
  };
  const handDeleteColor = (index: number) => {
    const updateSize = [...selectColor];
    updateSize.splice(index, 1);
    setSelectColor(updateSize);
  };
  const handleAddInfo = (e: any) => {
    e.preventDefault();
    const string: any = `${formik.values.manufacturerProduct}: ${formik.values.inputDescription}`;
    if (
      formik.values.manufacturerProduct === "" ||
      formik.values.inputDescription === ""
    ) {
      return;
    } else {
      setValueManufacturer((preSize: any) => [...preSize, string]);
      formik.values.manufacturerProduct = "";
      formik.values.inputDescription = "";
    }
  };
  const handleDeleteManufacturer = (index: number) => {
    const updateSize = [...valueManufacturer];
    updateSize.splice(index, 1);
    setValueManufacturer(updateSize);
  };
  const showModalDetail = async (id: any) => {
    setShowModal(true);
    const res: any = await dispatch(fetchProductApi(id));
    setDataDetial(res.payload);
  };
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalPage: any = await dispatch(fetchCartProductAPI());
        setTotalPages(totalPage?.payload?.length);
        const CardPage: any = await dispatch(
          fetchCartProductAPIPage({ currentPage, limit })
        );
        setCard(CardPage?.payload);
        await dispatch(fetchGetImgProduct());
        await dispatch(fetchColor());
        await dispatch(fetchGetCountry());
        await dispatch(fetchProductOptions());
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch, status, currentPage]);
  return (
    <div className={cx("data-management")}>
      <span className={cx("data-management-title")}>Quản lý Sản phẩm</span>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Tên sản phẩm</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          placeholder="Nhập tên sản phẩm"
        />
        {formik.touched.name && formik.errors.name ? (
          <div className={cx("error")}> *{formik.errors.name}</div>
        ) : null}
        <label htmlFor="original_price">Giá gốc</label>
        <input
          type="text"
          id="original_price"
          name="original_price"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.original_price}
          placeholder="Nhập giá sản phẩm"
        />
        {formik.touched.original_price && formik.errors.original_price ? (
          <div className={cx("error")}> *{formik.errors.original_price}</div>
        ) : null}
        <label htmlFor="discounted_price">Giá đã giảm</label>
        <input
          type="text"
          id="discounted_price"
          name="discounted_price"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.discounted_price}
        />
        {formik.touched.discounted_price && formik.errors.discounted_price ? (
          <div className={cx("error")}>{formik.errors.discounted_price}</div>
        ) : null}
        <label htmlFor="category">Danh mục sản phẩm</label>
        <select
          name="category"
          id=""
          onChange={formik.handleChange}
          value={formik.values.category}
        >
          <option value="">-- Chọn danh mục --</option>
          {productOptions?.length > 0 &&
            productOptions?.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>
        {formik.touched.category && formik.errors.category ? (
          <div className={cx("error")}>{formik.errors.category}</div>
        ) : null}
        <br />
        <label htmlFor="image">ảnh sản phẩm</label>
        <FileBase type="file" multiple={false} onDone={handleAddImage} />
        {imgProduct && (
          <img
            src={imgProduct}
            alt="Uploaded"
            style={{ width: "200px", height: "auto", marginTop: "10px" }}
          />
        )}
        {error && <div className={cx("error")}>{error}</div>}

        <br />
        <Button
          variant="contained"
          color="primary"
          style={{
            marginTop: "16px",
            backgroundColor: "#1976d2",
            color: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            padding: "8px 16px",
          }}
          type="submit"
        >
          Thêm Sản phẩm
        </Button>
      </form>
      <div>
        <button onClick={() => onModalOpen()}>Thêm thông tin chi tiết</button>
      </div>
      {isModalOpen && (
        <div className={cx("modal-open-description")}>
          <div className={cx("modal-content")}>
            <div
              onClick={() => setIsModalOpen(false)}
              className={cx("close-modal")}
            >
              X
            </div>
            <h2>THÔNG TIN SẢN PHẨM</h2>
            <form>
              <div>
                <label htmlFor="frameFrom">Kích thước từ</label>
                <select
                  id="frameFrom"
                  name="frameFrom"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.frameFrom}
                  className="size-select-dropdown"
                >
                  <option value="">Chọn kích thước từ</option>
                  <option value="10">10 cm</option>
                  <option value="20">20 cm</option>
                  <option value="30">30 cm</option>
                  <option value="40">40 cm</option>
                  <option value="50">50 cm</option>
                  <option value="60">60 cm</option>
                  <option value="70">70 cm</option>
                  <option value="80">80 cm</option>
                  <option value="90">90 cm</option>
                  <option value="100">100 cm</option>
                </select>
              </div>

              <div>
                <label htmlFor="frameTo">Kích thước đến</label>
                <select
                  id="frameTo"
                  name="frameTo"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.frameTo}
                  className="size-select-dropdown"
                >
                  <option value="">Chọn kích thước đến</option>
                  <option value="20">20 cm</option>
                  <option value="30">30 cm</option>
                  <option value="40">40 cm</option>
                  <option value="50">50 cm</option>
                  <option value="60">60 cm</option>
                  <option value="70">70 cm</option>
                  <option value="80">80 cm</option>
                  <option value="90">90 cm</option>
                  <option value="100">100 cm</option>
                </select>
              </div>

              <button onClick={(e) => handleAddFrame(e)}>
                Thêm kích thước
              </button>

              {formik.touched.frameFrom && formik.errors.frameFrom && (
                <div className={cx("error")}>{formik.errors.frameFrom}</div>
              )}

              {formik.touched.frameTo && formik.errors.frameTo && (
                <div className={cx("error")}>{formik.errors.frameTo}</div>
              )}
              <div className={cx("size-list")}>
                <h3>Danh sách kích thước:</h3>
                <div className={cx("size-render")}>
                  {size.map((size: any, index: number) => (
                    <span key={index} onClick={() => handDeleteSize(index)}>
                      {size} <span className="remove-size-text">[Xóa]</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Tựa tay */}
              <div>
                <label htmlFor="color">Màu sắc</label>
                <select
                  id="color"
                  name="color"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.color}
                >
                  <option value="">Chọn màu sắc</option>
                  {color && color.length > 0 ? (
                    color.map((color: any, index: number) => (
                      <option key={index} value={color.hex}>
                        {color.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>Không có màu sắc nào</option>
                  )}
                </select>
                <button onClick={(e) => handAddColor(e)}>Thêm màu</button>

                {formik.touched.color && formik.errors.color && (
                  <div className={cx("error")}>{formik.errors.color}</div>
                )}
              </div>
              {selectColor && selectColor.length > 0 && (
                <div className={cx("color-list")}>
                  <h3>Danh sách màu sắc:</h3>
                  <div className={cx("color-render")}>
                    {selectColor.map((color: any, index: number) => (
                      <span
                        style={{ backgroundColor: color }}
                        key={index}
                        onClick={() => handDeleteColor(index)}
                      >
                        {color}
                        <span className="remove-size-text">[Xóa]</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Đệm ngồi */}
              <div>
                <label htmlFor="country">xuất xứ</label>
                <select
                  id="country"
                  name="country"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.country}
                >
                  <option value="">Chọn xuất xưởng</option>
                  {country?.map((country: any, index: number) => (
                    <option key={index} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {formik.touched.seatCushion && formik.errors.seatCushion && (
                  <div className={cx("error")}>{formik.errors.seatCushion}</div>
                )}
              </div>
              <div>
                <label htmlFor="accessories">Chọn phụ kiện đi kèm:</label>
                <select
                  id="accessories"
                  name="accessories"
                  value={formik.values.accessories}
                  onChange={formik.handleChange}
                >
                  <option value="gối-tựa">Gối tựa</option>
                  <option value="khăn-trải-sofa">Khăn trải sofa</option>
                  <option value="bộ-chân-thay-thế">Bộ chân thay thế</option>
                  <option value="đệm-ngồi">Đệm ngồi</option>
                  <option value="chăn-phủ">Chăn phủ</option>
                </select>
                <p>Phụ kiện: {formik.values.accessories}</p>
              </div>

              <div>
                <label htmlFor="brandName">Thương hiệu:</label>
                <input
                  type="text"
                  id="brandName"
                  name="brandName"
                  onChange={formik.handleChange}
                  value={formik.values.brandName}
                  placeholder="Nhập tên thương hiệu"
                />
              </div>

              <div>
                <label htmlFor="brandDescription">Mô tả thương hiệu:</label>
                <input
                  type="text"
                  id="brandDescription"
                  name="brandDescription"
                  placeholder="Nhập mô tả về thương hiệu"
                  value={formik.values.brandDescription}
                  onChange={formik.handleChange}
                />
              </div>

              <div>
                <label htmlFor="manufacturerName">Nhà sản xuất:</label>
                <input
                  type="text"
                  id="manufacturerName"
                  name="manufacturerName"
                  value={formik.values.manufacturerName}
                  onChange={formik.handleChange}
                  placeholder="Nhập tên nhà sản xuất"
                />
              </div>

              <div>
                <label htmlFor="manufacturerInfo">
                  Thông tin nhà sản xuất:
                </label>
                <input
                  id="manufacturerInfo"
                  name="manufacturerInfo"
                  value={formik.values.manufacturerInfo}
                  onChange={formik.handleChange}
                  placeholder="Nhập thông tin về nhà sản xuất"
                />
              </div>

              <div>
                <label htmlFor="manufacturerProduct">
                  Nhập thông tin mô tả sản phẩm
                </label>
                <select
                  id="manufacturerProduct"
                  name="manufacturerProduct"
                  value={formik.values.manufacturerProduct}
                  onChange={formik.handleChange}
                >
                  <option value="">Chọn mô tả</option>
                  <option value="Chất liệu">Chất liệu</option>
                  <option value="Công dụng">Công dụng</option>
                  <option value="Thiết kế">Thiết kế</option>
                  <option value="Tính năng đặc biệt">Tính năng đặc biệt</option>
                  <option value="Thông tin bảo hành">Thông tin bảo hành</option>
                </select>
                <input
                  type="text"
                  id="inputDescription"
                  name="inputDescription"
                  placeholder="Nhập thông tin về sản phẩm"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.inputDescription}
                />
                <Button
                  className={cx("add-info")}
                  onClick={(e) => handleAddInfo(e)}
                >
                  Add thông tin
                </Button>
                {formik.touched.manufacturerProduct &&
                  formik.errors.manufacturerProduct && (
                    <div className={cx("error")}>
                      {formik.errors.inputDescription}
                    </div>
                  )}
                <div>
                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      margin: "0 auto",
                      display: "block",
                    }}
                  >
                    Thông tin mô tả sản phẩm đã thêm
                  </p>
                  {valueManufacturer?.map(
                    (manufacturer: any, index: number) => (
                      <div key={index} className={cx("manufacturer-value")}>
                        <p>{manufacturer}</p>
                        <Button onClick={() => handleDeleteManufacturer(index)}>
                          Xóa
                        </Button>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div style={{ marginTop: "20px" }}>
                <button onClick={() => setIsModalOpen(false)}>
                  Lưu thông tin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div style={{ marginTop: "16px" }}>
        <table style={{ width: "100%" }} className={cx("data-table")}>
          <thead>
            <th>ID</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Giảm Giá</th>
            <th>Danh mục</th>
            <th>Ảnh</th>
            <th>Thông tin chi tiết</th>
          </thead>
          <tbody>
            {data?.map((data: any, index: any) => {
              const discountedPrice = Number(data.discounted_price);
              const originalPrice = Number(data.original_price);
              const formatDiscountedPrice = discountedPrice.toLocaleString();
              const formatOriginalPrice = originalPrice.toLocaleString();
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <th>
                    {data.name.length > 25
                      ? `${data.name.slice(0, 25)}...`
                      : data.name}
                  </th>
                  <th>{formatOriginalPrice} VNĐ</th>
                  <th>{formatDiscountedPrice} VNĐ</th>
                  <th>{data.category}</th>
                  <th>
                    <img
                      src={data.img}
                      alt={data.name}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </th>

                  <th>
                    <Button
                      onClick={() => {
                        showModalDetail(data.id);
                      }}
                    >
                      Xem chi tiết
                    </Button>
                  </th>

                  <th>
                    <Button
                      color="secondary"
                      onClick={() => handDelete(data.id)}
                    >
                      Xóa
                    </Button>
                  </th>
                  <th>
                    <Button color="primary" onClick={() => handleEdit(data.id)}>
                      Chỉnh sửa
                    </Button>
                  </th>
                </tr>
              );
            })}
            {showModal && (
              <div className={cx("modal-show-description")}>
                <div className={cx("modal-content-show-description")}>
                  <button
                    className={cx("close-modal")}
                    onClick={() => setShowModal(false)}
                  >
                    X
                  </button>
                  <h2>Thông tin chi tiết</h2>
                  <table>
                    <tbody>
                      <tr>
                        <th>Color</th>
                        <td>
                          {dataDetial?.color &&
                            dataDetial?.color.map((color: any) => {
                              return (
                                <span
                                  style={{
                                    marginRight: "10px",
                                    backgroundColor: color,
                                  }}
                                >
                                  {color}
                                </span>
                              );
                            })}
                        </td>
                      </tr>
                      <tr>
                        <th>xuất xứ</th>
                        <td>{dataDetial?.country}</td>
                      </tr>
                      <tr>
                        <th>size</th>
                        <td>
                          {dataDetial?.size &&
                            dataDetial?.size.map((size: any) => {
                              return (
                                <span
                                  style={{
                                    marginRight: "10px",
                                  }}
                                >
                                  {size}
                                </span>
                              );
                            })}
                        </td>
                      </tr>
                      <tr>
                        <th>Phụ kiện đi kèm</th>
                        <td>{dataDetial?.accessories}</td>
                      </tr>
                      <tr>
                        <th>Thương hiệu</th>
                        <td>{dataDetial?.brandName}</td>
                      </tr>
                      <tr>
                        <th>Mô tả thương hiệu</th>
                        <td>{dataDetial?.brandDescription}</td>
                      </tr>
                      <tr>
                        <th>Nhà sản xuất</th>
                        <td>{dataDetial?.manufacturerName}</td>
                      </tr>
                      <tr>
                        <th>Thông tin nhà sản xuất</th>
                        <td>{dataDetial?.manufacturerInfo}</td>
                      </tr>
                      <tr>
                        <th>Thống tin mô tả sản phẩm</th>
                        <td>
                          {dataDetial?.manufacturerProducts &&
                            dataDetial?.manufacturerProducts.map(
                              (item: any) => {
                                return <p>{item}</p>;
                              }
                            )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button onClick={() => setShowModal(false)}>Xác nhận</button>
                </div>
              </div>
            )}
          </tbody>
        </table>
      </div>
      <div style={{ width: "100%" }}>
        <div
          style={{
            width: "100%",
          }}
        >
          <PaginationPageProduct
            onPageChange={onPageChange}
            currentPage={currentPage}
            totalPages={totalPages}
            limit={limit}
          />
        </div>
      </div>
      {ShowModalEdit && (
        <>
          <ModalEdit />
        </>
      )}
    </div>
  );
};

export default ProductManagement;
