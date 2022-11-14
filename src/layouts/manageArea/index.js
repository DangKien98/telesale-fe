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
  areaCode: "",
  areaName: "",
  address: "",
  district: "",
  city: "",
};
const FORM_VALIDATION = Yup.object().shape({
  areaCode: Yup.string().required("Vui lòng nhập Mã Code"),
  areaName: Yup.string().required("Vui lòng nhập tên Khu Vực"),
  address: Yup.string().required("Vui lòng nhập địa chỉ"),
  district: Yup.string().required("Vui lòng nhập Quận/ Huyện"),
  city: Yup.string().required("Vui lòng nhập Thành Phố/ Tỉnh"),
});
function table() {
  const [location, setLocation] = useState([]);
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
    setLocation(location.filter((item) => item.no !== no));
  };
  useEffect(async () => {
    await axios.get(`${BASE_URL}/location`).then((response) => {
      console.log(response.data);
      setLocation(response.data);
    });
  }, []);
  return {
    columns: [
      { Header: "STT", accessor: "no", align: "center" },
      { Header: "Mã Code", accessor: "code", align: "center" },
      { Header: "Tên Khu Vực", accessor: "areaCustomer", align: "center" },
      { Header: "Địa chỉ", accessor: "address", align: "center" },
      { Header: "Quận Huyện", accessor: "district", align: "center" },
      { Header: "Tỉnh,TP", accessor: "city", align: "center" },
      { Header: "Hiện Thị", accessor: "status", align: "center" },
      { Header: "Edit", accessor: "edit", align: "center" },
      { Header: "Delete", accessor: "delete", align: "center" },
    ],
    rows: [
      ...location.map((loc) => ({
        no: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {loc.no}
          </MDTypography>
        ),
        code: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {loc.code}
          </MDTypography>
        ),
        areaCustomer: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {loc.areaCustomer}
          </MDTypography>
        ),
        address: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {loc.address}
          </MDTypography>
        ),
        district: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {loc.district}
          </MDTypography>
        ),
        city: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {loc.city}
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {loc.status}
          </MDTypography>
        ),
        edit: (
          <Link to={`/manageArea/updateArea/${loc.no}`} key={loc.no}>
            <MDButton>
              <EditIcon color="info">.</EditIcon>
            </MDButton>
          </Link>
        ),
        delete: (
          <Grid item xs={12} sm={6} lg={3}>
            <MDButton
              onClick={() => {
                handleDelete(loc.no);
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

function ManageArea() {
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
                  <MDTypography fontSize={13} variant="subtitle1" color="white" text-align="center" padding="10px">
                    Khu Vực
                  </MDTypography>
                  <MDButton variant="gradient" color="dark" onClick={handleOpen}>
                    <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                    &nbsp;Thêm Khu Vực
                  </MDButton>
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
                                      <TextField name="areaCode" label="Mã Code" />
                                    </Grid>
                                    <Grid item xs={6}>
                                      <TextField name="areaName" label="Tên Khu Vực" />
                                    </Grid>
                                    <Grid item xs={6}>
                                      <TextField name="address" label="Địa chỉ" />
                                    </Grid>
                                    <Grid item xs={6}>
                                      <TextField name="district" label="Huyện Quận" />
                                    </Grid>
                                    <Grid item xs={8}>
                                      <TextField name="city" label="Tỉnh, TP" />
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
                </Box>
              </MDBox>
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

export default ManageArea;
