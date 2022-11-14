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

// @mui material components
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
import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Icon } from "@mui/material";
import MDSnackbar from "components/MDSnackbar";
import { useSelector } from "react-redux";
import { Button, Form, Input, Modal, Select, Space } from "antd";
// import { useSelector } from "react-redux";

// console.log(process.env);
// const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const FORM_VALIDATION = {
  required: "${label} không được để trống",
  types: {
    email: "${label} không hợp lệ",
    number: "${label} không hợp lệ",
  },
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

function ManageLevel() {
  const [open, setOpen] = useState(false);
  const { Option } = Select;
  const [brandList, setBrandList] = useState([]);
  const [level, setLevel] = useState([]);
  const [successSB, setSuccessSB] = useState(false);
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  const user = useSelector((state) => state.auth.login?.currentUser);

  const [form] = Form.useForm();

  const handleClose = () => {
    setOpen(false);
  };
  const axiosConfig = {
    method: "get",
    url: "http://oggycute.tplinkdns.com:31080/api/levels",
    data: {},
    headers: {
      Accept: "application/json; text/plain; */*",
      Authorization: `Bearer ${user.tokenString}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };
  const fetchApi = useCallback(() => {
    axios(axiosConfig)
      .then((response) => {
        JSON.stringify(response.data);
        setLevel(response.data.length ? response.data : null);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    fetchApi();
  }, [form.submit]);
  const axiosConfigChannel = {
    method: "get",
    url: "http://oggycute.tplinkdns.com:31080/api/brands",
    data: {},
    headers: {
      Accept: "application/json; text/plain; */*",
      Authorization: `Bearer ${user.tokenString}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  };
  const onFinish = (values) => {
    console.log(values);
    axios
      .post(
        `http://oggycute.tplinkdns.com:31080/api/levels`,
        {
          name: values.level.name,
          code: values.level.code,
          note: values.level.note,
          status: 1,
          brandId: values.level.brandId,
        },
        {
          headers: {
            Accept: "application/json; text/plain; */*",
            Authorization: `Bearer ${user.tokenString}`,
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      )
      .then(
        (response) => {
          console.log(response);
          console.log("add succes");
          window.location.reload();
          // navigate("/manageCustomer");
        },
        (error) => {
          console.log(error);
        }
      );
  };
  useEffect(() => {
    axios(axiosConfigChannel)
      .then((response) => {
        JSON.stringify(response.data);
        setBrandList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  function table() {
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
      setLevel(level.filter((item) => item.no !== no));
    };

    return {
      columns: [
        { Header: "STT", accessor: "no", align: "center" },
        { Header: "Mã Code", accessor: "code", align: "center" },
        { Header: "Tên KH", accessor: "name", align: "center" },
        { Header: "Brand", accessor: "brand", align: "center" },
        { Header: "Tổng Data", accessor: "total", align: "center" },
        { Header: "Hiện thị", accessor: "status", align: "center" },
        { Header: "Edit", accessor: "edit", align: "center" },
        { Header: "Delete", accessor: "delete", align: "center" },
      ],
      rows: [
        ...level.map((lev) => ({
          no: (
            <Link to={`/manageLevel/updateLevel/${lev.id}`} key={lev.id}>
              <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"
                sx={[
                  {
                    "&:hover": {
                      color: "#04bd95",
                    },
                  },
                ]}
              >
                {lev.id}
              </MDTypography>
            </Link>
          ),
          code: (
            <Link to={`/manageLevel/updateLevel/${lev.id}`} key={lev.id}>
              <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"
                sx={[
                  {
                    "&:hover": {
                      color: "#04bd95",
                    },
                  },
                ]}
              >
                {lev.code}
              </MDTypography>
            </Link>
          ),
          name: (
            <Link to={`/manageLevel/updateLevel/${lev.id}`} key={lev.id}>
              <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"
                sx={[
                  {
                    "&:hover": {
                      color: "#04bd95",
                    },
                  },
                ]}
              >
                {lev.name}
              </MDTypography>
            </Link>
          ),
          brand: (
            <Link to={`/manageLevel/updateLevel/${lev.id}`} key={lev.id}>
              <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"
                sx={[
                  {
                    "&:hover": {
                      color: "#04bd95",
                    },
                  },
                ]}
              >
                {lev.brandName}
              </MDTypography>
            </Link>
          ),
          total: (
            <Link to={`/manageLevel/updateLevel/${lev.id}`} key={lev.id}>
              <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"
                sx={[
                  {
                    "&:hover": {
                      color: "#04bd95",
                    },
                  },
                ]}
              >
                {lev.customerNumber}
              </MDTypography>
            </Link>
          ),
          status: (
            <Link to={`/manageLevel/updateLevel/${lev.id}`} key={lev.id}>
              <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"
                sx={[
                  {
                    "&:hover": {
                      color: "#04bd95",
                    },
                  },
                ]}
              >
                {lev.status === 1 ? "Đã bật" : "Đã tắt"}
              </MDTypography>
            </Link>
          ),
          edit: (
            <Link to={`/manageLevel/updateLevel/${lev.id}`} key={lev.id}>
              <MDButton>
                <EditIcon color="info">.</EditIcon>
              </MDButton>
            </Link>
          ),
          delete: (
            <Grid item xs={12} sm={6} lg={3}>
              <MDButton
                onClick={() => {
                  handleDelete(lev.no);
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
  const { columns, rows } = table();
  return (
    <DashboardLayout>
      <DashboardNavbar/>
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
                    Level
                  </MDTypography>
                  <MDButton variant="gradient" color="dark" onClick={handleOpen}>
                    <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                    &nbsp;Thêm Level
                  </MDButton>
                </Box>
                <Modal
                  visible={open}
                  title="Thêm Level"
                  onCancel={handleClose}
                  onOk={handleClose}
                  style={{ top: 80 }}
                  footer={[
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button key="back" onClick={handleClose}>
                        Hủy
                      </Button>
                      <Button
                        key="submit"
                        type="primary"
                        onClick={() => {
                          form.submit();
                          handleClose();
                        }}
                        style={{
                          backgroundColor: "#4fa953",
                          borderColor: "#4fa953",
                        }}
                      >
                        Thêm Level
                      </Button>
                    </div>,
                  ]}
                >
                  <Form
                    form={form}
                    {...layout}
                    validateMessages={FORM_VALIDATION}
                    onFinish={onFinish}
                  >
                    <Form.Item name={["level", "code"]} label="Code" rules={[{ required: true }]}>
                      <Input
                        type="text"
                        style={{ borderRadius: 2 }}
                        placeholder="Nhập mã level"

                      // value={firstName}
                      // onBlur={firstNameChangeHandle}
                      />
                    </Form.Item>
                    <Form.Item name={["level", "name"]} label="Level" rules={[{ required: true }]}>
                      <Input
                        type="text"
                        style={{ borderRadius: 2 }}
                        placeholder="Nhập tên level"

                      // value={firstName}
                      // onBlur={firstNameChangeHandle}
                      />
                    </Form.Item>
                    <Form.Item name={["level", "note"]} label="Note" rules={[{ required: true }]}>
                      <Input
                        type="text"
                        style={{ borderRadius: 2 }}
                        placeholder="Nhập ghi chú"

                      // value={firstName}
                      // onBlur={firstNameChangeHandle}
                      />
                    </Form.Item>

                    <Form.Item
                      name={["level", "brandId"]}
                      label="Brand"
                      rules={[{ required: true }]}
                    >
                      <Select
                        style={{ borderRadius: 2, width: 150 }}

                      // value={level}
                      // onChange={handleLevelChange}
                      >
                        {brandList.map((bra) => (
                          <Option value={bra.id}>{bra.name}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Form>
                </Modal>
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

export default ManageLevel;
