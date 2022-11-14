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
import { useEffect, useState } from "react";
import { Box, Icon, IconButton } from "@mui/material";
import MDSnackbar from "components/MDSnackbar";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { Form, Input, Select, Modal, Button, DatePicker, Space } from "antd";
import moment from "moment";
import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";

const FORM_VALIDATION = {
  required: "${label} không được để trống",
  types: {
    email: "${label} không hợp lệ",
    number: "${label} không hợp lệ",
  },
  firstName: "${label} is required",
  lastName: "${label} is required",
  address: "${label} is required",
  gender: "Vui lòng chọn giới tính",
  level: "Vui lòng chọn Level",
  channel: "Vui lòng chọn nguồn",
  userId: "Vui lòng chọn người phụ trách",
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

function ManageCustomer() {
  const [customer, setCustomer] = useState([]);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [listChannel, setListChannel] = useState([]);
  const [listLevel, setListLevel] = useState([]);
  const [, setUserAll] = useState([]);
  const [successSB, setSuccessSB] = useState(false);
  const [, setExcelFile] = useState([]);
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const user = useSelector((state) => state.auth.login?.currentUser);

  const readExcel = (file) => {
    
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d) => {
      console.log(d);
      // eslint-disable-next-line array-callback-return
      d.map((excel) => {
        axios
          .post(
            `http://oggycute.tplinkdns.com:31080/api/customers`,
            {
              firstName: excel.firstname,
              lastName: excel.lastname,
              phoneNumber: `0${excel.phone}`,
              email: excel.email,
              address: excel.address,
              dayOfBith: new Date().toISOString(),
              gender: Number(excel.gender),
              totalOrder: 0,
              status: 1,
              channelId: excel.channelid,
              levelId: excel.levelid,
              userId: excel.userid,
              brandId: excel.brandid,
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
      });
      setExcelFile(d);
    });
  };

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Thêm mới thành công"
      dateTime="vài giày trước"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );
  const currentUser = jwtDecode(user.tokenString);

  const axiosConfigUserAll = {
    method: "get",
    url: "http://oggycute.tplinkdns.com:31080/api/users",
    data: {},
    headers: {
      Accept: "application/json; text/plain; */*",
      Authorization: `Bearer ${user.tokenString}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  };
  useEffect(() => {
    axios(axiosConfigUserAll)
      .then((response) => {
        console.log(response);
        JSON.stringify(response.data);
        setUserAll(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const axiosConfig = {
    method: "get",
    url: "http://oggycute.tplinkdns.com:31080/api/customers",
    data: {},
    headers: {
      Accept: "application/json; text/plain; */*",
      Authorization: `Bearer ${user.tokenString}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  };
  useEffect(() => {
    axios(axiosConfig)
      .then((response) => {
        console.log(response);
        JSON.stringify(response.data);
        setCustomer(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function table() {
    // const updateHandler = (no) => {
    //   navigate(`/update/${params.no}`);
    // };

    return {
      columns: [
        { Header: "STT", accessor: "no", align: "center" },
        { Header: "Họ KH", accessor: "firstname", align: "center" },
        { Header: "Tên KH", accessor: "lastname", align: "center" },
        { Header: "SDT", accessor: "phone", align: "center" },
        { Header: "Địa Chỉ", accessor: "address", align: "center" },
        { Header: "Email", accessor: "email", align: "center" },
        { Header: "Ngày import", accessor: "import", align: "center" },
        { Header: "Giới tính", accessor: "sex", align: "center" },
        { Header: "Người phụ trách", accessor: "username", align: "center" },
        { Header: "Edit", accessor: "edit", align: "center" },
        { Header: "Delete", accessor: "delete", align: "center" },
      ],
      rows: [
        ...customer.map((cus, index) => ({
          no: (
            <Link to={`/manageCustomer/updateCustomer/${cus.id}`} key={cus.id}>
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
                sx={[
                  {
                    "&:hover": {
                      color: "#04bd95",
                    },
                  },
                ]}
              >
                {index + 1}
              </MDTypography>
            </Link>
          ),
          firstname: (
            <Link to={`/manageCustomer/updateCustomer/${cus.id}`} key={cus.id}>
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
                sx={[
                  {
                    "&:hover": {
                      color: "#04bd95",
                    },
                  },
                ]}
              >
                {cus.firstName}
              </MDTypography>
            </Link>
          ),
          lastname: (
            <Link to={`/manageCustomer/updateCustomer/${cus.id}`} key={cus.id}>
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
                sx={[
                  {
                    "&:hover": {
                      color: "#04bd95",
                    },
                  },
                ]}
              >
                {cus.lastName}
              </MDTypography>
            </Link>
          ),
          phone: (
            <Link to={`/manageCustomer/updateCustomer/${cus.id}`} key={cus.id}>
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
                sx={[
                  {
                    "&:hover": {
                      color: "#04bd95",
                    },
                  },
                ]}
              >
                {cus.phoneNumber}
              </MDTypography>
            </Link>
          ),
          address: (
            <Link to={`/manageCustomer/updateCustomer/${cus.id}`} key={cus.id}>
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
                sx={[
                  {
                    "&:hover": {
                      color: "#04bd95",
                    },
                  },
                ]}
              >
                {cus.address}
              </MDTypography>
            </Link>
          ),
          email: (
            <Link to={`/manageCustomer/updateCustomer/${cus.id}`} key={cus.id}>
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
                sx={[
                  {
                    "&:hover": {
                      color: "#04bd95",
                    },
                  },
                ]}
              >
                {cus.email}
              </MDTypography>
            </Link>
          ),
          import: (
            <Link to={`/manageCustomer/updateCustomer/${cus.id}`} key={cus.id}>
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
                sx={[
                  {
                    "&:hover": {
                      color: "#04bd95",
                    },
                  },
                ]}
              >
                {new Date(`${cus.dateCreated}`).toLocaleDateString()}
              </MDTypography>
            </Link>
          ),
          sex: (
            <Link to={`/manageCustomer/updateCustomer/${cus.id}`} key={cus.id}>
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
                sx={[
                  {
                    "&:hover": {
                      color: "#04bd95",
                    },
                  },
                ]}
              >
                {cus.gender === 1 ? "Nam" : "Nữ"}
              </MDTypography>
            </Link>
          ),
          username: (
            <Link to={`/manageCustomer/updateCustomer/${cus.id}`} key={cus.id}>
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
                sx={[
                  {
                    "&:hover": {
                      color: "#04bd95",
                    },
                  },
                ]}
              >
                {cus.userName}
              </MDTypography>
            </Link>
          ),
          edit: (
            <Link to={`/manageCustomer/updateCustomer/${cus.id}`} key={cus.id}>
              <IconButton size="small">
                <EditIcon color="info">.</EditIcon>
              </IconButton>
            </Link>
          ),
          delete: (
            <Grid item xs={12} sm={6} lg={3}>
              <IconButton
                size="small"
                onClick={() => {
                  openSuccessSB();
                }}
              >
                <CancelIcon color="error">.</CancelIcon>
              </IconButton>
              {renderSuccessSB}
            </Grid>
          ),
        })),
      ],
    };
  }

  const { columns, rows } = table();

  console.log(currentUser);
  console.log(new Date(Date.now()).toISOString());

  const axiosConfigChannel = {
    method: "get",
    url: "http://oggycute.tplinkdns.com:31080/api/channels",
    data: {},
    headers: {
      Accept: "application/json; text/plain; */*",
      Authorization: `Bearer ${user.tokenString}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  };
  useEffect(() => {
    axios(axiosConfigChannel)
      .then((response) => {
        JSON.stringify(response.data);
        setListChannel(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const axiosConfigLevel = {
    method: "get",
    url: "http://oggycute.tplinkdns.com:31080/api/levels",
    data: {},
    headers: {
      Accept: "application/json; text/plain; */*",
      Authorization: `Bearer ${user.tokenString}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  };
  useEffect(() => {
    axios(axiosConfigLevel)
      .then((response) => {
        JSON.stringify(response.data);
        setListLevel(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const { Option } = Select;
  const [form] = Form.useForm();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onFinish = (values) => {
    console.log(values);
    axios
      .post(
        `http://oggycute.tplinkdns.com:31080/api/customers`,
        {
          firstName: values.user.firstName,
          lastName: values.user.lastName,
          phoneNumber: values.user.phone,
          email: values.user.email,
          address: values.user.address,
          dayOfBith: date,
          gender: Number(values.user.gender),
          totalOrder: 0,
          status: 1,
          channelId: values.user.channel,
          levelId: values.user.level,
          userId: Number(currentUser.Id),
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
  const dateChange = (date1, dateString) => {
    console.log(date1, dateString);
    setDate(dateString);
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
                py={2}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                padding="12px"
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: "center",
                    width: "5000x",
                  }}
                >
                  <MDTypography variant="h6" color="white" text-align="center" padding="10px">
                    Khách Hàng
                  </MDTypography>
                  <MDBox>
                    <MDButton variant="gradient" color="dark" onClick={handleOpen}>
                      <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                      &nbsp;Thêm Khách Hàng
                    </MDButton>
                    <label htmlFor="raised-button-file">
                      <input
                        style={{ display: "none" }}
                        id="raised-button-file"
                        multiple
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          readExcel(file);
                        }}
                      />
                      <MDButton
                        variant="gradient"
                        color="success"
                        component="span"
                        sx={{ marginLeft: "10px" }}
                      >
                        <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                        &nbsp;Import Excel
                      </MDButton>
                    </label>
                  </MDBox>
                </Box>
                <Modal
                  visible={open}
                  title="Thêm Khách Hàng"
                  onCancel={handleClose}
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
                          // createHandler(event);
                          openSuccessSB();
                        }}
                        style={{
                          backgroundColor: "#4fa953",
                          borderColor: "#4fa953",
                        }}
                      >
                        Thêm khách hàng
                      </Button>
                      {renderSuccessSB}
                    </div>,
                  ]}
                >
                  <Form
                    form={form}
                    {...layout}
                    validateMessages={FORM_VALIDATION}
                    onFinish={onFinish}
                  >
                    <Form.Item name={["user", "lastName"]} label="Họ" rules={[{ required: true }]}>
                      <Input style={{ borderRadius: 2 }} placeholder="Nhập họ của bạn" />
                    </Form.Item>
                    <Form.Item
                      name={["user", "firstName"]}
                      label="Tên"
                      rules={[{ required: true }]}
                    >
                      <Input style={{ borderRadius: 2 }} placeholder="Nhập tên của bạn" />
                    </Form.Item>
                    <Form.Item
                      name={["user", "phone"]}
                      label="Số điện thoại"
                      rules={[
                        {
                          pattern: /^[0-9]+$/,
                          message: "${label} không hợp lệ",
                          required: true,
                        },
                      ]}
                    >
                      <Input style={{ borderRadius: 2 }} placeholder="Nhập Số điện thoại" />
                    </Form.Item>
                    <Form.Item
                      name={["user", "address"]}
                      label="Địa chỉ"
                      rules={[{ required: true }]}
                    >
                      <Input style={{ borderRadius: 2 }} placeholder="Nhập địa chỉ của bạn" />
                    </Form.Item>
                    <Form.Item
                      name={["user", "email"]}
                      label="Email"
                      rules={[{ type: "email", required: true }]}
                    >
                      <Input style={{ borderRadius: 2 }} placeholder="Nhập Email của bạn" />
                    </Form.Item>
                    <Space size={[15]} align="end" style={{ marginLeft: 20 }}>
                      <Form.Item
                        name={["user", "gender"]}
                        label="Giới tính"
                        rules={[{ gender: true }]}
                        labelCol={{ span: 9, offset: 5 }}
                        wrapperCol={{ span: 8 }}
                      >
                        <Select style={{ width: 80, marginLeft: 8 }}>
                          <Option value="1">Nam</Option>
                          <Option value="0">Nữ</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name={["user", "dob"]}
                        label="Ngày sinh"
                        rule={[{ required: true }]}
                        labelCol={{ span: 8, offset: 4 }}
                        wrapperCol={{ span: 8 }}
                      >
                        <DatePicker
                          format="YYYY-MM-DD"
                          style={{ width: 132, marginLeft: 5 }}
                          value={moment(date)}
                          onChange={dateChange}
                        />
                      </Form.Item>
                    </Space>
                    <Form.Item name={["user", "level"]} label="Level">
                      <Select style={{ borderRadius: 2, width: 150 }}>
                        {listLevel.map((lev) => (
                          <Option value={lev.id}>{`${lev.name}`}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item name={["user", "channel"]} label="Nguồn KH">
                      <Select style={{ borderRadius: 2, width: 150 }}>
                        {listChannel.map((cha) => (
                          <Option value={cha.id}>{cha.name}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Form>
                </Modal>
              </MDBox>
              <MDBox pt={3} ml={3} sx={{ display: "flex" }}>
                <MDBox>
                  <Select placeholder="Chọn" style={{ borderRadius: 5, width: 150 }}>
                    <Option value="1">AmazingTech</Option>
                    <Option value="2">AmazingTech2</Option>
                  </Select>
                </MDBox>
                <MDBox ml={2}>
                  <Select placeholder="Chọn" style={{ borderRadius: 5, width: 150 }}>
                    <Option value="1">AmazingTech</Option>
                    <Option value="2">AmazingTech2</Option>
                  </Select>
                </MDBox>
              </MDBox>

              <MDBox pt={3} sx={{ display: "flex" }}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted="true"
                  canSearch={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default ManageCustomer;
