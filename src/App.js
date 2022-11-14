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

import { useState, useEffect } from "react";

// react-router components
import { Routes, Route, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

import Dashboard from "layouts/dashboard";
import ManageCustomer from "layouts/manageCustomer";
import ManageLevel from "layouts/manageLevel";
import UpdateLevel from "layouts/manageLevel/updateLevel";

import ManageBranch from "layouts/manageBranch";

import ManageCategory from "layouts/manageCategory";
import UpdateCategory from "layouts/manageCategory/updateCategory";
import ManageChannel from "layouts/manageChannel";
import UpdateChannel from "layouts/manageChannel/updateChannel";

import ManageProduct from "layouts/manageProduct";
import UpdateProduct from "layouts/manageProduct/updateProduct";
import ManageSourceData from "layouts/manageSourceData";
import UpdateSourceData from "layouts/manageSourceData/updateSourceData";
import Basic from "layouts/authentication/sign-in";
import UpdateStore from "layouts/manageBranch/updateStore";
import OrderItem from "layouts/manageCustomer/orderItem";
import ManageReport from "layouts/manager";
import UpdateCustomer from "./layouts/manageCustomer/updateCustomer";
import ReportCall from "./layouts/reportCall";
import ManageStaff from "./layouts/manageStaff";
import SelectBrand from "./layouts/authentication/sign-in/selectBrand";
// import { useSelector } from "react-redux";
// import jwtDecode from "jwt-decode";


export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  // const [role, setRole] = useState("");
  // const user = useSelector((state) => state.auth.login?.currentUser);
  // const currentUser = jwtDecode(user.tokenString);
  // console.log(currentUser);
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
    // openSidenav,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  // const handleSidenavOpen = () => setOpenSidenav(dispatch, !openSidenav)

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  // const sidebarButton = (
  //   <MDBox
  //     display="flex"
  //     justifyContent="center"
  //     alignItems="center"
  //     width="3.25rem"
  //     height="3.25rem"
  //     bgColor="white"
  //     shadow="sm"
  //     borderRadius="50%"
  //     position="fixed"
  //     left="1rem"
  //     bottom="50%"
  //     zIndex={99}
  //     color="dark"
  //     sx={{ cursor: "pointer" }}
  //     onClick={handleSidenavOpen}
  //   >
  //     <ArrowForwardIosIcon fontSize="small" color="inherit">
  //       arrow
  //     </ArrowForwardIosIcon>
  //   </MDBox>
  // );


  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="Telesale"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          {/* {sidebarButton} */}
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        <Route path="/manageCustomer" exact element={<ManageCustomer />} />
        <Route path="/dashboard" element={<Dashboard />} key="dashboard" />
        <Route path="/manageCustomer/updateCustomer/:customerId" element={<UpdateCustomer />} />
        <Route path="/manageCustomer/orderItem/:customerId" element={<OrderItem />} />
        <Route path="/manageLevel" element={<ManageLevel />} />
        <Route path="/manageLevel/updateLevel/:levelId" element={<UpdateLevel />} />
        <Route path="/manageBranch" element={<ManageBranch />} />
        <Route path="/manageBranch/updateStore/:storeId" element={<UpdateStore />} />
        <Route path="/manageSourceData" element={<ManageSourceData />} key="manageSourceData" />
        <Route
          path="/manageSourceData/updateSourceData/:SourcaDataId"
          element={<UpdateSourceData />}
        />
        <Route path="/manageChannel" element={<ManageChannel />} key="manageChannel" />
        <Route path="/manageChannel/updateChannel/:ChannelId" element={<UpdateChannel />} />

        <Route path="/manageCategory" element={<ManageCategory />} key="manageCategory" />
        <Route path="/manageCategory/updateCategory/:CategoryId" element={<UpdateCategory />} />
        <Route path="/manageProduct" element={<ManageProduct />} key="manageProduct" />
        <Route path="/manageProduct/updateProduct/:ProductId" element={<UpdateProduct />} />
        <Route path="/sign-in" element={<Basic />} key="sign-in" />
        <Route path="/" element={<Basic />} key="sign-in" />
        <Route path="/manageReport" element={<ManageReport />} />
        <Route path="/reportCall" element={<ReportCall/>}/>
        <Route path="/manageStaff" element={<ManageStaff/>}/>
        <Route path="/brand" element={<SelectBrand/>}/>
      </Routes>
    </ThemeProvider>
  );
}
