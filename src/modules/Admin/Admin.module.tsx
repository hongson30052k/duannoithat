import WithAuthAdmin from "../../hoc/WithAuthAdmin";
import AdminMain from "./components/AdminMain/AdminMain";

const Admin = () => {
  return (
    <>
      <AdminMain />
    </>
  );
};

export default WithAuthAdmin(Admin);
