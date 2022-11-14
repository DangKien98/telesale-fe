/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";

// react-router components
import { useLocation, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
} from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  // setOpenConfigurator,
} from "context";
import { logoutUser } from "layouts/redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import MDTypography from "components/MDTypography";
import jwtDecode from "jwt-decode";
import axios from "axios";

function DashboardNavbar({ absolute, light, isMini }) {
  const [controller] = useMaterialUIController();
  const { transparentNavbar, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const [checkUser, setCheckUser] = useState("");
  const route = useLocation().pathname.split("/").slice(1);
  const dispatchTo = useDispatch();
  const navigate = useNavigate();

  const handleCloseMenu = () => setOpenMenu(false);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });


  const user = useSelector((state) => state.auth.login?.currentUser);
  const currentUser = jwtDecode(user.tokenString); 

  const axiosConfig = {
    method: "get",
    url: `http://oggycute.tplinkdns.com:31080/api/users/${currentUser.Id}`,
    data: {},
    headers: {
      Accept: "application/json; text/plain; */*",
      Authorization: `Bearer ${user.tokenString}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };
  useEffect(async () => {
    await axios(axiosConfig)
      .then((response) => {
        JSON.stringify(response.data.user);
        setCheckUser(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(checkUser.role);
  if(checkUser.role === "admin" || checkUser.role === "manager"){
    if(localStorage.getItem("refresh")==="load"){
      window.location.reload();
      localStorage.setItem("refresh","unload");
      localStorage.setItem("report", "report");
    }
  }
  if(checkUser.role === "staff"){
    localStorage.setItem("report", "manage");
    if(localStorage.getItem("refresh")==="load"){
      window.location.reload();
      localStorage.setItem("refresh","unload");
    }
  }
  console.log(currentUser);

  const handleLogout = () => {
    logoutUser(dispatchTo, navigate);
    localStorage.clear("report");
    localStorage.setItem("refresh","load");    
  };

  const handleReport = () => {
    localStorage.setItem("report", "report");
    navigate("/dashboard");
  }

  const handleManage = () => {
    localStorage.setItem("report", "manage");
    navigate("/manageCustomer");
  }

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 1 }}
    >
      {checkUser.role === "admin" || checkUser.role === "manager" ?
        localStorage.getItem("report") === "report" ?
          <MDBox onClick={() => window.location.reload()}>
            <NotificationItem
              icon={
                <AssignmentIcon sx={iconsStyle}>
                  Manage
                </AssignmentIcon>
              }
              title="Quản lý"
              onClick={handleManage}
            />
          </MDBox>
          :
          <MDBox onClick={() => window.location.reload()} >
            <NotificationItem
              icon={
                <EqualizerIcon sx={iconsStyle}>
                  Report
                </EqualizerIcon>
              }
              title="Báo cáo"
              onClick={handleReport}
            />
          </MDBox>
        : null
      }
      <NotificationItem
        icon={
          <LogoutIcon sx={iconsStyle}>
            Logout
          </LogoutIcon>}
        title="Logout"
        onClick={handleLogout}
      />
    </Menu>
  );

  return (
    <AppBar
      position="static"
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox sx={{ display: "flex" }} color={light ? "white" : "inherit"}>

              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                variant="contained"
              >
                <PersonIcon sx={iconsStyle} />
                <MDTypography variant="text" sx={{ fontSize: 17 }}>Welcome, Telesys</MDTypography>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <MoreHorizIcon sx={iconsStyle}>options</MoreHorizIcon>
              </IconButton>
              {renderMenu()}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
