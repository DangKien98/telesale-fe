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
import { useEffect, useState } from "react";
import { Box, Icon } from "@mui/material";
import MDSnackbar from "components/MDSnackbar";
import { useSelector } from "react-redux";
import { Button, Form, Input, Modal, Select } from "antd";

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

function table() {
  const [store, setStore] = useState([]);
  const [successSB, setSuccessSB] = useState(false);
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const [branch, setBranch] = useState()

  const user = useSelector((state) => state.auth.login?.currentUser);

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
    setBranch(branch.filter((bra) => bra.no !== no));
  };

  const axiosConfig = {
    method: "get",
    url: "http://oggycute.tplinkdns.com:31080/api/stores",
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
        JSON.stringify(response.data);
        console.log(response.data);
        setStore(response.data);
      })
      .catch((error) => {
        console.log(user.tokenString);
        console.log(error);
      });
  }, []);

  return {
    columns: [
      { Header: "STT", accessor: "no", align: "center" },
      { Header: "Mã Cửa Hàng", accessor: "shopCode", align: "center" },
      { Header: "Tên Cửa Hàng", accessor: "shopName", align: "center" },
      { Header: "Thương Hiệu", accessor: "brand", align: "center" },
      { Header: "Địa Chỉ", accessor: "address", align: "center" },
      { Header: "Edit", accessor: "edit", align: "center" },
      { Header: "Delete", accessor: "delete", align: "center" },
    ],
    rows: [
      ...store.map((sto) => ({
        no: (
          <Link to={`/manageBranch/updateStore/${sto.id}`} key={sto.id}>
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"
              sx={[
                {
                  "&:hover": {
                    color: "#04bd95",
                  },
                },
              ]}
            >
              {sto.id}
            </MDTypography>
          </Link>
        ),
        shopCode: (
          <Link to={`/manageBranch/updateStore/${sto.id}`} key={sto.id}>
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"
              sx={[
                {
                  "&:hover": {
                    color: "#04bd95",
                  },
                },
              ]}
            >
              {sto.brandCode}
            </MDTypography>
          </Link>
        ),
        shopName: (
          <Link to={`/manageBranch/updateStore/${sto.id}`} key={sto.id}>
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"
              sx={[
                {
                  "&:hover": {
                    color: "#04bd95",
                  },
                },
              ]}
            >
              {sto.name}
            </MDTypography>
          </Link>
        ),
        brand: (
          <Link to={`/manageBranch/updateStore/${sto.id}`} key={sto.id}>
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"
              sx={[
                {
                  "&:hover": {
                    color: "#04bd95",
                  },
                },
              ]}
            >
              {sto.brandName}
            </MDTypography>
          </Link>
        ),
        address: (
          <Link to={`/manageBranch/updateStore/${sto.id}`} key={sto.id}>
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"
              sx={[
                {
                  "&:hover": {
                    color: "#04bd95",
                  },
                },
              ]}
            >
              {sto.address}
            </MDTypography>
          </Link>
        ),
        edit: (
          <Link to={`/manageBranch/updateStore/${sto.id}`} key={sto.id}>
            <MDButton>
              <EditIcon color="info">.</EditIcon>
            </MDButton>
          </Link>
        ),
        delete: (
          <Grid item xs={12} sm={6} lg={3}>
            <MDButton
              onClick={() => {
                handleDelete(sto.no);
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

function ManageBranch() {
  const { columns, rows } = table();
  const [open, setOpen] = useState(false);
  const { Option } = Select;
  const [form] = Form.useForm();
  const [brandList, setBrandList] = useState([]);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const axiosConfigBrand = {
    method: "get",
    url: "http://oggycute.tplinkdns.com:31080/api/brands",
    data: {},
    headers: {
      Accept: "application/json; text/plain; */*",
      Authorization: `Bearer ${user.tokenString}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };
  useEffect(async () => {
    await axios(axiosConfigBrand)
      .then((response) => {
        JSON.stringify(response.data);
        console.log(response.data);
        setBrandList(response.data);
      })
      .catch((error) => {
        console.log(user.tokenString);
        console.log(error);
      });
  }, []);
  const onFinish = (values) => {
    console.log(values);
    console.log(123);
    axios
      .post(
        `http://oggycute.tplinkdns.com:31080/api/stores`,
        {
          name: values.branch.name,
          status: 1,
          address: values.branch.address,
          email: values.branch.email,
          phoneNumber: values.branch.phoneNumber,
          brandId: values.branch.brandId,
          code: values.branch.code,
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
          // navigate("/manageCustomer");
        },
        (error) => {
          console.log(error);
        }
      );
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
                    Chi Nhánh
                  </MDTypography>
                  <MDButton variant="gradient" color="dark" onClick={handleOpen}>
                    <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                    &nbsp;Thêm Chi Nhánh
                  </MDButton>
                </Box>
                <Modal
                  visible={open}
                  title="Thêm cửa hàng"
                  onCancel={handleClose}
                  style={{ top: 80 }}
                  footer={[
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button key="back" onClick={handleClose}>
                        Hủy
                      </Button>
                      <Button key="submit" type="primary" onClick={form.submit}
                        style={{
                          backgroundColor: "#4fa953",
                          borderColor: "#4fa953",
                        }}
                      >
                        Thêm cửa hàng
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
                    <Form.Item
                      name={["branch", "code"]}
                      label="Mã cửa hàng"
                      rules={[{ required: true }]}
                    >
                      <Input
                        style={{ borderRadius: 2 }}
                        placeholder="Nhập mã của hàng"
                      // value={firstName}
                      // onBlur={firstNameChangeHandle}
                      />
                    </Form.Item>
                    <Form.Item
                      name={["branch", "name"]}
                      label="Tên cửa hàng"
                      rules={[{ required: true }]}
                    >
                      <Input
                        style={{ borderRadius: 2 }}
                        placeholder="Nhập tên của hàng"
                      // value={firstName}
                      // onBlur={firstNameChangeHandle}
                      />
                    </Form.Item>
                    <Form.Item
                      name={["branch", "address"]}
                      label="Địa chỉ"
                      rules={[{ required: true }]}
                    >
                      <Input
                        style={{ borderRadius: 2 }}
                        placeholder="Nhập địa chỉ"
                      // value={lastName}
                      // onBlur={lastNameChangeHandle}
                      />
                    </Form.Item>
                    <Form.Item
                      name={["branch", "email"]}
                      label="Email"
                      rules={[{ type: "email", required: true }]}
                    >
                      <Input
                        style={{ borderRadius: 2 }}
                        placeholder="Nhập email"
                      // value={lastName}
                      // onBlur={lastNameChangeHandle}
                      />
                    </Form.Item>
                    <Form.Item
                      name={["branch", "phoneNumber"]}
                      label="Số điện thoại"
                      rules={[
                        {
                          pattern: /^[0-9]+$/,
                          message: "${label} không hợp lệ",
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        style={{ borderRadius: 2 }}
                        placeholder="Nhập số điện thoại"
                      // value={lastName}
                      // onBlur={lastNameChangeHandle}
                      />
                    </Form.Item>
                    <Form.Item
                      name={["branch", "description"]}
                      label="Mô tả"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        style={{ borderRadius: 2 }}
                        placeholder=""
                      // value={lastName}
                      // onBlur={lastNameChangeHandle}
                      />
                    </Form.Item>
                    <Form.Item
                      name={["branch", "brandId"]}
                      label="Thương hiệu"
                      rules={[{ required: true }]}
                    >
                      <Select
                        style={{ borderRadius: 2, width: 150 }}
                      // value={level}
                      // onChange={handleLevelChange}
                      >
                        {brandList.map((brand) => (
                          <Option value={brand.id}>{brand.name}</Option>
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

export default ManageBranch;
