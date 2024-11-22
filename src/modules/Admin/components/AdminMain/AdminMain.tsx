import { Box } from "@mui/material";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminContent from "../AdminContent/AdminContent";
const AdminMain = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <AdminHeader />
      <AdminContent />
    </Box>
  );
};

export default AdminMain;
