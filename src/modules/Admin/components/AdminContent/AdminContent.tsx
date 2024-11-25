import "./AdminContent.css";
import React, { useState } from "react";
import {
  Box,
  Drawer,
  Toolbar,
  List,
  ListItemIcon,
  ListItemButton,
  ListItem,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import DashboardContent from "../DashboardContent/DashboardContent";
import OrderManagement from "../OrderManagement/OrderManagement";
import CustomerManagement from "../CustomerManagement/CustomerManagement";
import ProductManagement from "../ProductManagement/ProductManagement";
import HomeIcon from "@mui/icons-material/Home";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useNavigate } from "react-router-dom";
const drawerWidth = 240;

const AdminContent = () => {
  const navigate = useNavigate();
  const [currentContent, setCurrentContent] = useState<React.ReactNode>(
    <DashboardContent />
  );
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleItemClick = (component: React.ReactNode, index: number) => {
    setCurrentContent(component);
    setIndex(index);
  };

  const DrawerLists = (
    <Box
      sx={{
        width: 300,
        height: "100%",
        backgroundColor: "#f4f4f4",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      role="presentation"
      onClick={toggleDrawer}
    >
      <List style={{ fontSize: "1.4rem", fontWeight: "bold" }}>
        <HomeIcon
          style={{
            fontSize: "3rem",
            cursor: "pointer",
            margin: "10px auto",
            display: "block",
          }}
          onClick={() => {
            navigate("/");
          }}
        />
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
    </Box>
  );

  return (
    <>
      <div className="admin-content">
        <div className="admin-sidebar">
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
              <HomeIcon
                style={{
                  fontSize: "3rem",
                  cursor: "pointer",
                  margin: "10px auto",
                  display: "block",
                }}
                onClick={() => {
                  navigate("/");
                }}
              />
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
        </div>
      </div>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <div className="menu-sidebar" onClick={toggleDrawer}>
          <MenuOpenIcon style={{ fontSize: "3rem", cursor: "pointer" }} />
        </div>
        <Toolbar />
        {currentContent}
      </Box>
      <Drawer open={open} onClose={toggleDrawer}>
        {DrawerLists}
      </Drawer>
    </>
  );
};

export default AdminContent;
