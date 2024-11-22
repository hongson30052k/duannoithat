import React, { useState } from "react";
import {
  Box,
  Drawer,
  Toolbar,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import DashboardContent from "../DashboardContent/DashboardContent";
import OrderManagement from "../OrderManagement/OrderManagement";
import CustomerManagement from "../CustomerManagement/CustomerManagement";
import ProductManagement from "../ProductManagement/ProductManagement";

const drawerWidth = 240;

const AdminContent = () => {
  const [currentContent, setCurrentContent] = useState<React.ReactNode>(
    <DashboardContent />
  );
  const [index, setIndex] = useState(0);

  const handleItemClick = (component: React.ReactNode, index: number) => {
    setCurrentContent(component);
    setIndex(index);
  };

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#fafafb",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List style={{ fontSize: "1.4rem", fontWeight: "bold" }}>
          <ListItemButton
            onClick={() => handleItemClick(<DashboardContent />, 0)}
            sx={{
              backgroundColor: index === 0 ? "#e0e0e0" : "transparent",
            }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <span>Dashboard</span>
          </ListItemButton>
          <ListItemButton
            onClick={() => handleItemClick(<ProductManagement />, 1)}
            sx={{
              backgroundColor: index === 1 ? "#e0e0e0" : "transparent",
            }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <span>Quản lý sản phẩm</span>
          </ListItemButton>
          <ListItemButton
            onClick={() => handleItemClick(<OrderManagement />, 2)}
            sx={{
              backgroundColor: index === 2 ? "#e0e0e0" : "transparent",
            }}
          >
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <span>Quản lý Đơn hàng</span>
          </ListItemButton>
          <ListItemButton
            onClick={() => handleItemClick(<CustomerManagement />, 3)}
            sx={{
              backgroundColor: index === 3 ? "#e0e0e0" : "transparent",
            }}
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <span>Quản lý Khách Hàng</span>
          </ListItemButton>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {currentContent}
      </Box>
    </>
  );
};

export default AdminContent;
