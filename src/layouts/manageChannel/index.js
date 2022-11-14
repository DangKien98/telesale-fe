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
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

function table() {
  const [customerPlace, setCustomerPlace] = useState([]);
  const [successSB, setSuccessSB] = useState(false);
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const user = useSelector((state) => state.auth.login?.currentUser);
  console.log(user.tokenString);
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
    setCustomerPlace(customerPlace.filter((cus) => cus.no !== no));
  };

  const axiosConfig = {
    method: "get",
    url: "http://oggycute.tplinkdns.com:31080/api/channels",
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
        setCustomerPlace(response.data);
      })
      .catch((error) => {
        console.log(user.tokenString);
        console.log(error);
      });
  }, []);
  return {
    columns: [
      { Header: "STT", accessor: "no", align: "center" },
      { Header: "Mã Kênh", accessor: "channel", align: "center" },
      { Header: "Kênh KH", accessor: "channelCustomer", align: "center" },
      { Header: "Ngày chỉnh sửa", accessor: "updated", align: "center" },
      { Header: "Edit", accessor: "edit", align: "center" },
      { Header: "Delete", accessor: "delete", align: "center" },
    ],
    rows: [
      ...customerPlace.map((cusPlace) => ({
        no: (
          <Link to={`/manageChannel/updateChannel/${cusPlace.no}`} key={cusPlace.no}>
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"
              sx={[
                {
                  "&:hover": {
                    color: "#04bd95",
                  },
                },
              ]}
            >
              {cusPlace.id}
            </MDTypography>
          </Link>
        ),
        channel: (
          <Link to={`/manageChannel/updateChannel/${cusPlace.no}`} key={cusPlace.no}>
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"
              sx={[
                {
                  "&:hover": {
                    color: "#04bd95",
                  },
                },
              ]}
            >
              {cusPlace.code}
            </MDTypography>
          </Link>
        ),
        channelCustomer: (
          <Link to={`/manageChannel/updateChannel/${cusPlace.no}`} key={cusPlace.no}>
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"
              sx={[
                {
                  "&:hover": {
                    color: "#04bd95",
                  },
                },
              ]}
            >
              {cusPlace.name}
            </MDTypography>
          </Link>
        ),

        updated: (
          <Link to={`/manageChannel/updateChannel/${cusPlace.no}`} key={cusPlace.no}>
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"
              sx={[
                {
                  "&:hover": {
                    color: "#04bd95",
                  },
                },
              ]}
            >
              {new Date(`${cusPlace.lastEditTime}`).toLocaleDateString()}
            </MDTypography>
          </Link>
        ),
        edit: (
          <Link to={`/manageChannel/updateChannel/${cusPlace.no}`} key={cusPlace.no}>
            <MDButton>
              <EditIcon color="info">.</EditIcon>
            </MDButton>
          </Link>
        ),
        delete: (
          <Grid item xs={12} sm={6} lg={3}>
            <MDButton
              onClick={() => {
                handleDelete(cusPlace.no);
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

function ManageChannel() {
  const { columns, rows } = table();
  const [open, setOpen] = useState(false);
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
  }
  return (
    <DashboardLayout>
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
                    Thêm Kênh Khách Hàng
                  </MDTypography>
                  <MDButton variant="gradient" color="dark" onClick={handleOpen}>
                    <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                    &nbsp;Thêm Kênh
                  </MDButton>
                </Box>
                <Modal
                  visible={open}
                  title="Thêm Kênh"
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
                        Thêm kênh
                      </Button>
                    </div>,
                  ]}
                >
                  <Form form={form} {...layout} onFinish={onFinish} validateMessages={FORM_VALIDATION}>
                    <Form.Item
                      name={["channel", "code"]}
                      label="Mã kênh"
                      rules={[{ required: true }]}
                    >
                      <Input
                        style={{ borderRadius: 2 }}
                        placeholder="Nhập mã kênh"
                      // value={firstName}
                      // onBlur={firstNameChangeHandle}
                      />
                    </Form.Item>
                    <Form.Item
                      name={["channel", "name"]}
                      label="Kênh KH"
                      rules={[{ required: true }]}
                    >
                      <Input
                        style={{ borderRadius: 2 }}
                        placeholder="Nhập tên kênh khách hàng"
                      // value={lastName}
                      // onBlur={lastNameChangeHandle}
                      />
                    </Form.Item>
                    <Form.Item
                      name={["channel", "sourceDataId"]}
                      label="Nguồn KH"
                      rules={[{ level: true }]}
                    >
                      <Select
                        style={{ borderRadius: 2, width: 150 }}
                      // value={level}
                      // onChange={handleLevelChange}
                      >
                        <Option value="1">Zalo</Option>
                        <Option value="2">Telegram</Option>
                        <Option value="3">Viber</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name={["channel", "revenueForecast"]}
                      label="Dự báo doanh thu"
                      rules={[{
                        pattern: /^[0-9]+$/,
                        message: "${label} không hợp lệ",
                        required: true
                      }]}
                    >
                      <Input
                        style={{ borderRadius: 2 }}
                        placeholder="Nhập dự báo doanh thu"
                      // value={lastName}
                      // onBlur={lastNameChangeHandle}
                      />
                    </Form.Item>
                    <Form.Item
                      name={["channel", "costExpected"]}
                      label="Chi phí dự tính"
                      rules={[{
                        pattern: /^[0-9]+$/,
                        message: "${label} không hợp lệ",
                        required: true
                      }]}
                    >
                      <Input
                        style={{ borderRadius: 2 }}
                        placeholder="Nhập tên kênh khách hàng"
                      // value={lastName}
                      // onBlur={lastNameChangeHandle}
                      />
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

export default ManageChannel;
