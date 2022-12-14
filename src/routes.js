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

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
// import Tables from "layouts/tables";
// import Billing from "layouts/billing";
// import Notifications from "layouts/notifications";
// import Profile from "layouts/profile";
// import SignIn from "layouts/authentication/sign-in";
// import SignUp from "layouts/authentication/sign-up";
import ManageCustomer from "layouts/manageCustomer";
import ManageLevel from "layouts/manageLevel";
import ManageBranch from "layouts/manageBranch";
import ManageCategory from "layouts/manageCategory";
import ManageChannel from "layouts/manageChannel";
import ManageProduct from "layouts/manageProduct";
import ManageSourceData from "layouts/manageSourceData";
import ReportCall from "layouts/reportCall";

// @mui icons
import Icon from "@mui/material/Icon";
import ManageStaff from "layouts/manageStaff";

const check = localStorage.getItem("report");

// eslint-disable-next-line import/no-mutable-exports
let routes = [];
if(check === "report"){
  routes = [
    {
      type: "collapse",
      name: "Dashboard",
      key: "dashboard",
      icon: <Icon fontSize="small">dashboard</Icon>,
      route: "/dashboard",
      component: <Dashboard />,
    },
    {
      type: "collapse",
      name: "B??o c??o cu???c g???i",
      key: "reportCall",
      icon: <Icon fontSize="small">call</Icon>,
      route: "/reportCall",
      component: <ReportCall/>
    },
    {
      type: "collapse",
      name: "Qu???n l?? nh??n vi??n",
      key: "manageStaff",
      icon: <Icon fontSize="small">person circle</Icon>,
      route: "/manageStaff",
      component: <ManageStaff/>
    },
  ];
}
else{
routes = [
  {
    type: "collapse",
    name: "Qu???n L?? Kh??ch H??ng",
    key: "manageCustomer",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/manageCustomer",
    component: <ManageCustomer />,
  },
  {
    type: "collapse",
    name: "Qu???n L?? Level",
    key: "manageLevel",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/manageLevel",
    component: <ManageLevel />,
  },
  {
    type: "collapse",
    name: "Qu???n L?? Chi Nh??nh",
    key: "manageBranch",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/manageBranch",
    component: <ManageBranch />,
  },
  {
    type: "collapse",
    name: "Qu???n L?? Ngu???n KH",
    key: "manageSourceData",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/manageSourceData",
    component: <ManageSourceData />,
  },
  {
    type: "collapse",
    name: "Qu???n L?? K??nh KH",
    key: "manageChannel",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/manageChannel",
    component: <ManageChannel />,
  },
  {
    type: "collapse",
    name: "Qu???n L?? Danh M???c",
    key: "manageCategory",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/manageCategory",
    component: <ManageCategory />,
  },
  {
    type: "collapse",
    name: "Qu???n L?? S???n Ph???m",
    key: "manageProduct",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/manageProduct",
    component: <ManageProduct />,
  },

  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/authentication/sign-in",
  //   component: <SignIn />,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
];
}
export default routes;
