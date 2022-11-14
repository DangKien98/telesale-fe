import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Icon, Modal } from "@mui/material";
import MDSnackbar from "components/MDSnackbar";
import { Button, Container, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextField from "../../formUI/TextField";
import ButtonConfirm from "../../formUI/Button";


console.log(process.env);
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  gap: "20px",
  flexDirection: "column",
};

const INITIAL_FORM_STATE = {
  disCode: "",
  disName: "",
  address: "",
  province: "",
};
const FORM_VALIDATION = Yup.object().shape({
  disCode: Yup.string().required("Vui lòng nhập Mã Code"),
  disName: Yup.string().required("Vui lòng nhập Tên Huyện"),
  address: Yup.string().required("Vui lòng nhập Địa chỉ"),
  province: Yup.string().required("Vui lòng nhập Tỉnh"),
});
function table() {
  const [district, setDistrict] = useState([]);

  const [successSB, setSuccessSB] = useState(false);
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Delete Successfully"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );
  const handleDelete = (no) => {
    setDistrict(district.filter((item) => item.no !== no));
  };

  useEffect(async () => {
    await axios.get(`${BASE_URL}/district`).then((response) => {
      console.log(response.data);
      setDistrict(response.data);
    });
  }, []);
  return {
    columns: [
      { Header: "STT", accessor: "no", align: "center" },
      { Header: "Mã Code", accessor: "code", align: "center" },
      { Header: "Tên Khu Vực", accessor: "areaCustomer", align: "center" },
      { Header: "Địa chỉ", accessor: "address", align: "center" },
      { Header: "Tỉnh, Tp", accessor: "city", align: "center" },
      { Header: "Hiển Thị", accessor: "status", align: "center" },
      { Header: "Edit", accessor: "edit", align: "center" },
      { Header: "Delete", accessor: "delete", align: "center" },
    ],
    rows: [
      ...district.map((dist) => ({
        no: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {dist.no}
          </MDTypography>
        ),
        code: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {dist.code}
          </MDTypography>
        ),
        areaCustomer: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {dist.areaCustomer}
          </MDTypography>
        ),
        address: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {dist.address}
          </MDTypography>
        ),
        city: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {dist.city}
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {dist.status}
          </MDTypography>
        ),
        edit: (
          <Link to={`/manageDistrict/updateDistrict/${dist.no}`} key={dist.no}>
            <MDButton>
              <EditIcon color="info">.</EditIcon>
            </MDButton>
          </Link>
        ),
        delete: (
          <Grid item xs={12} sm={6} lg={3}>
            <MDButton
              onClick={() => {
                handleDelete(dist.no);
                openSuccessSB();
              }}
            >
              <CancelIcon color="error">.</CancelIcon>
            </MDButton>
            {renderSuccessSB}
          </Grid>
        ),
      })),
    ],
  };
}

function ManageDistrict() {
  const { columns, rows } = table();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                padding="12px"
              >
                <Box
                  sx={{ display: "flex", justifyContent: "space-between", alignContent: "center" }}
                >
                  <MDTypography variant="h6" color="white" text-align="center" padding="10px">
                    Huyện
                  </MDTypography>
                  <MDButton variant="gradient" color="dark" onClick={handleOpen}>
                    <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                    &nbsp;Thêm Huyện
                  </MDButton>
                </Box>
              </MDBox>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Container maxWidth="md">
                        <div>
                          <Formik
                            initialValues={{ ...INITIAL_FORM_STATE }}
                            validationSchema={FORM_VALIDATION}
                            onSubmit={(values) => {
                              console.log(values);
                            }}
                          >
                            <Form>
                              <Grid container spacing={2}>
                                <Grid item xs={4}>
                                  <Typography>Thêm Khách Hàng</Typography>
                                </Grid>
                                <Grid marginLeft={35} item xs={2}>
                                  <Button variant="contained" color="prinamry">
                                    Reset
                                  </Button>
                                </Grid>
                                <Grid item xs={6}>
                                  <TextField name="disCode" label="Mã Code" />
                                </Grid>
                                <Grid item xs={6}>
                                  <TextField name="disName" label="Tên Huyện, TP" />
                                </Grid>
                                <Grid item xs={6}>
                                  <TextField name="address" label="Địa chỉ" />
                                </Grid>
                                <Grid item xs={6}>
                                  <TextField name="phone" label="Tỉnh" />
                                </Grid>
                                <Grid marginLeft={17} item xs={4}>
                                  <ButtonConfirm>Thêm Khách Hàng</ButtonConfirm>
                                </Grid>
                                <Grid item xs={4}>
                                  <Button variant="contained" color="secondary">
                                    Hủy
                                  </Button>
                                </Grid>
                              </Grid>
                            </Form>
                          </Formik>
                        </div>
                      </Container>
                    </Grid>
                  </Grid>
                </Box>
              </Modal>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted="true"
                  canSearch
                  entriesPerPage="true"
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default ManageDistrict;

// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";

// // Material Dashboard 2 React example components
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";

// // Data
// import authorsTableData from "layouts/tables/data/authorsTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";

// function ManageDistrict() {
//   const { columns, rows } = authorsTableData();
//   const { columns: pColumns, rows: pRows } = projectsTableData();

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox pt={6} pb={3}>
//         <Grid container spacing={6}>
//           <Grid item xs={12}>
//             <Card>
//               <MDBox
//                 mx={2}
//                 mt={-3}
//                 py={3}
//                 px={2}
//                 variant="gradient"
//                 bgColor="info"
//                 borderRadius="lg"
//                 coloredShadow="info"
//               >
//                 <MDTypography variant="h6" color="white">
//                   Authors Table
//                 </MDTypography>
//               </MDBox>
//               <MDBox pt={3}>
//                 <DataTable
//                   table={{ columns, rows }}
//                   isSorted={false}
//                   entriesPerPage={false}
//                   showTotalEntries={false}
//                   noEndBorder
//                 />
//               </MDBox>
//             </Card>
//           </Grid>
//           <Grid item xs={12}>
//             <Card>
//               <MDBox
//                 mx={2}
//                 mt={-3}
//                 py={3}
//                 px={2}
//                 variant="gradient"
//                 bgColor="info"
//                 borderRadius="lg"
//                 coloredShadow="info"
//               >
//                 <MDTypography variant="h6" color="white">
//                   Projects Table
//                 </MDTypography>
//               </MDBox>
//               <MDBox pt={3}>
//                 <DataTable
//                   table={{ columns: pColumns, rows: pRows }}
//                   isSorted={false}
//                   entriesPerPage={false}
//                   showTotalEntries={false}
//                   noEndBorder
//                 />
//               </MDBox>
//             </Card>
//           </Grid>
//         </Grid>
//       </MDBox>
//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default ManageDistrict;
