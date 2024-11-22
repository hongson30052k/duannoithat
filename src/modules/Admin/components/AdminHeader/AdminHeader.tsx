import { AppBar, Toolbar, Typography } from "@mui/material";

const AdminHeader = () => {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AdminHeader;
