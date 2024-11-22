import { useDispatch, useSelector } from "react-redux";
import styles from "./CustomerManagement.module.scss";
import classNames from "classnames/bind";
import { RootState } from "../../../../store/store";
import { useEffect } from "react";
import { fetchGetUserFalseAdmin } from "../../../../store/slices/UserSlice";
import { fetchGetImgFalseAdmin } from "../../../../store/slices/UserLoginSlice";
const cx = classNames.bind(styles);

const CustomerManagement = () => {
  const dispatch = useDispatch();
  const { userFalseAdmin } = useSelector((state: RootState) => state.userState);
  const { userImgAdmin } = useSelector(
    (state: RootState) => state.UserLoginState
  );
  const newData = userImgAdmin?.map((item1: any) => {
    const item2: any = userFalseAdmin?.find(
      (item: any) => Number(item?.id) === Number(item1?.id)
    );
    return item2 ? { ...item1, ...item2 } : item1;
  });
  useEffect(() => {
    dispatch(fetchGetUserFalseAdmin());
    dispatch(fetchGetImgFalseAdmin());
  }, []);
  return (
    <>
      <div className={cx("container-user")}>
        <h1>Quản Lý Khách Hàng</h1>

        <table className={cx("customerTable")}>
          <thead>
            <tr>
              <th>#</th>
              <th>Tên Khách Hàng</th>
              <th>Điện Thoại</th>
              <th>Địa chỉ</th>
              <th>Trạng thái </th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {newData?.map((item: any, index: any) => {
              return (
                <tr>
                  <td>
                    <img
                      src={item.img}
                      alt={item.myname}
                      className={cx("img-data")}
                    />
                  </td>
                  <td>{item?.myname}</td>
                  <td>{item?.phone}</td>
                  <td>{item?.address}</td>
                  <td>{item?.isAdmin ? "Admin" : "User"}</td>
                  <td>
                    <button className={cx("btn delete-btn")}>Xóa</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CustomerManagement;
