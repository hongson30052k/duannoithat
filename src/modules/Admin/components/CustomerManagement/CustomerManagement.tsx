import { useDispatch, useSelector } from "react-redux";
import styles from "./CustomerManagement.module.scss";
import classNames from "classnames/bind";
import { RootState } from "../../../../store/store";
import { useEffect, useState } from "react";
import {
  fetchGetUser,
  fetchGetUserFalseAdmin,
} from "../../../../store/slices/UserSlice";
import { fetchGetImgFalseAdmin } from "../../../../store/slices/UserLoginSlice";
import ModalEditUser from "../ModelEditUser/ModalEditUser";
const cx = classNames.bind(styles);

const CustomerManagement = () => {
  const [show, setShow] = useState(false);
  const [id, setId] = useState<number>(0);
  const { statusEdit } = useSelector((state: RootState) => state.userState);
  console.log(show, "show");
  const dispatch = useDispatch();
  const [dataUser, setDataUser] = useState<any>([]);
  const { userImgAdmin } = useSelector(
    (state: RootState) => state.UserLoginState
  );
  const newData = userImgAdmin?.map((item1: any) => {
    const item2: any = dataUser.find(
      (item: any) => Number(item?.id) === Number(item1?.id)
    );
    return item2 ? { ...item1, ...item2 } : item1;
  });
  const handleEdit = (id: number) => {
    setShow(true);
    setId(id);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: any = await dispatch(fetchGetUser());
        setDataUser(res?.payload);
        await dispatch(fetchGetImgFalseAdmin());
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [statusEdit]);
  console.log(dataUser, "dataUser");
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
              <th>Trạng thái</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {newData &&
              newData?.map((item: any, index: any) => {
                return (
                  <>
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
                        {item?.isAdmin === true ? null : (
                          <button
                            className={cx("btn active-btn")}
                            onClick={() => handleEdit(item.id)}
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
        {show && <ModalEditUser setShows={setShow} id={id} />}
      </div>
    </>
  );
};

export default CustomerManagement;
