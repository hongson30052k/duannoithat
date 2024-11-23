import { useEffect, useState } from "react";
import styles from "./OrderManagement.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import {
  fetchChangePendingOrderProduct,
  fetchChangeStatusOrderProduct,
  fetchDeleteOrder,
  fetchGetOrder,
  fetchGetOrderProduct,
} from "../../../../store/slices/CartOderSlice";
const cx = classNames.bind(styles);
const OrderManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { items, itemProduct, status } = useSelector(
    (state: RootState) => state.cartOderState
  );
  console.log(items, "itemssssssssssssssssss");
  const dispatch = useDispatch();
  console.log(items, "items");
  const onShowProductDetail = async (id: any) => {
    await dispatch(fetchGetOrderProduct(id));
    setIsModalOpen(true);
  };
  const handlePending = async (id: any) => {
    await dispatch(fetchChangePendingOrderProduct(id));
  };
  const handleStatus = async (values: any) => {
    await dispatch(fetchChangeStatusOrderProduct(values));
  };
  const handleDelete = async (id: any) => {
    await dispatch(fetchDeleteOrder(id));
  };
  useEffect(() => {
    dispatch(fetchGetOrder());
    const fetchData = async () => {
      await dispatch(fetchGetOrder());
    };
    fetchData();
  }, [status, dispatch]);
  return (
    <div>
      <div className={cx("order-management")}>
        <h1>Quản lý Đơn hàng</h1>

        <table className={cx("order-table")}>
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Khách hàng</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Ngày đặt</th>
              <th>Địa chỉ</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {items &&
              items.map((item: any, index: number) => {
                const stringDay = `${item?.date?.day}/${item?.date?.month}/${item?.date?.year}`;
                return (
                  <tr key={index}>
                    <td>{item?.id}</td>
                    <td>{item?.name}</td>
                    <td>{item?.total.toLocaleString()} VND</td>
                    <td>
                      {item?.status === "Pending" && "Chưa xử lý"}
                      {item?.status === "Processing" && "Đang chuẩn bị"}
                      {item?.status === "Shipped" && "Đang giao hàng"}
                      {item?.status === "Delivered" && "Đã giao hàng"}
                      {item?.status === "Canceled" && "Đã hủy"}
                    </td>
                    <td>{stringDay}</td>
                    <td>{item?.address}</td>
                    <td>
                      <button
                        className={cx("action-btn")}
                        onClick={() => {
                          onShowProductDetail(item?.id);
                        }}
                      >
                        Xem chi tiết
                      </button>
                      {item?.status === "Pending" ? (
                        <button
                          className={cx("action-btn")}
                          onClick={() => {
                            handlePending(item?.id);
                          }}
                        >
                          Xác nhận
                        </button>
                      ) : (
                        <select
                          className={cx("action-select")}
                          value={item?.status}
                          onChange={(e) =>
                            handleStatus({
                              id: item?.id,
                              status: e.target.value,
                            })
                          }
                        >
                          Thay đổi trạng thái
                          <option value="Processing">Đang chuẩn bị</option>
                          <option value="Shipped">Đang giao hàng</option>
                          <option value="Delivered">Đã giao hàng</option>
                          <option value="Canceled">Đã hủy</option>
                        </select>
                      )}
                      <>
                        {item?.status === "Canceled" && (
                          <button
                            className={cx("action-btn")}
                            onClick={() => {
                              handleDelete(item?.id);
                            }}
                          >
                            xóa
                          </button>
                        )}
                      </>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {isModalOpen ? (
          <div className={cx("modal-overlay")}>
            <div>
              <div className={cx("modal-content")}>
                <ul>
                  <h2>Chi tiết đơn hàng #{itemProduct?.id}</h2>
                  {itemProduct &&
                    itemProduct?.product.map((item: any, index: number) => {
                      const price = Number(item.product.discounted_price);
                      const totalPrice = Number(
                        item.product.discounted_price * item.quantity
                      );
                      const priceTotal = totalPrice.toLocaleString();
                      const formatPrice = price.toLocaleString();
                      return (
                        <li className={cx("modal-item")} key={index}>
                          <span>
                            <strong>Tên SP: {item.product.name}</strong>
                          </span>
                          <span>Số lượng: {item.quantity}</span>
                          <span>
                            Giá: {formatPrice}
                            VND
                          </span>
                          <span>
                            Tổng: {priceTotal}
                            VND
                          </span>
                        </li>
                      );
                    })}
                </ul>
                <button
                  className={cx("close-btn")}
                  onClick={() => setIsModalOpen(false)}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default OrderManagement;
