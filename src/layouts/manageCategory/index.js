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
  const [category, setCategory] = useState([]);
  const [successSB, setSuccessSB] = useState(false);
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
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
    setCategory(category.filter((item) => item.no !== no));
  };

  const axiosConfig = {
    method: "get",
    url: "http://oggycute.tplinkdns.com:31080/api/product-categories",
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
        setCategory(response.data);
      })
      .catch((error) => {
        console.log(user.tokenString);
        console.log(error);
      });
  }, []);

  return {
    columns: [
      { Header: "STT", accessor: "no", align: "center" },
      { Header: "Tên Danh Mục", accessor: "nameCategory", align: "center" },
      { Header: "Mô Tả", accessor: "description", align: "center" },
      { Header: "Tổng Sản Phẩm", accessor: "total", align: "center" },
      { Header: "Brand", accessor: "brand", align: "center" },
      { Header: "Edit", accessor: "edit", align: "center" },
      { Header: "Delete", accessor: "delete", align: "center" },
    ],
    rows: [
      ...category.map((cate) => ({
        no: (
          <Link to={`/manageCategory/updateCategory/${cate.no}`} key={cate.no}>
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"
              sx={[
                {
                  "&:hover": {
                    color: "#04bd95",
                  },
                },
              ]}
            >
              {cate.id}
            </MDTypography>
          </Link>
        ),
        nameCategory: (
          <Link to={`/manageCategory/updateCategory/${cate.no}`} key={cate.no}>
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"
              sx={[
                {
                  "&:hover": {
                    color: "#04bd95",
                  },
                },
              ]}
            >
              {cate.name}
            </MDTypography>
          </Link>
        ),
        description: (
          <Link to={`/manageCategory/updateCategory/${cate.no}`} key={cate.no}>
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"
              sx={[
                {
                  "&:hover": {
                    color: "#04bd95",
                  },
                },
              ]}
            >
              {cate.description}
            </MDTypography>
          </Link>
        ),
        total: (
          <Link to={`/manageCategory/updateCategory/${cate.no}`} key={cate.no}>
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"
              sx={[
                {
                  "&:hover": {
                    color: "#04bd95",
                  },
                },
              ]}
            >
              {cate.productNumber}
            </MDTypography>
          </Link>
        ),
        brand: (
          <Link to={`/manageCategory/updateCategory/${cate.no}`} key={cate.no}>
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"
              sx={[
                {
                  "&:hover": {
                    color: "#04bd95",
                  },
                },
              ]}
            >
              {cate.brandName}
            </MDTypography>
          </Link>
        ),
        edit: (
          <Link to={`/manageCategory/updateCategory/${cate.no}`} key={cate.no}>
            <MDButton>
              <EditIcon color="info">.</EditIcon>
            </MDButton>
          </Link>
        ),
        delete: (
          <Grid item xs={12} sm={6} lg={3}>
            <MDButton
              onClick={() => {
                handleDelete(cate.no);
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

function ManageCategory() {
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
                  <MDTypography
                    variant="h6"
                    color="white"
                    text-align="center"
                    padding="10px"
                  >
                    Danh mục
                  </MDTypography>
                  <MDButton variant="gradient" color="dark" onClick={handleOpen}>
                    <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                    &nbsp;Thêm Danh Mục
                  </MDButton>
                </Box>
                <Modal
                  visible={open}
                  title="Thêm Danh Mục"
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
                        Thêm danh mục
                      </Button>
                    </div>,
                  ]}
                >
                  <Form form={form} {...layout} validateMessages={FORM_VALIDATION} onFinish={onFinish}>
                    <Form.Item
                      name={["category", "name"]}
                      label="Tên danh mục"
                      rules={[{ required: true }]}
                    >
                      <Input
                        style={{ borderRadius: 2 }}
                        placeholder="Nhập tên danh mục"
                      // value={firstName}
                      // onBlur={firstNameChangeHandle}
                      />
                    </Form.Item>
                    <Form.Item
                      name={["category", "description"]}
                      label="Mô tả"
                      rules={[{ required: true }]}
                    >
                      <Input
                        style={{ borderRadius: 2 }}
                        placeholder="Nhập mô tả"
                      // value={lastName}
                      // onBlur={lastNameChangeHandle}
                      />
                    </Form.Item>
                    <Form.Item
                      name={["category", "productNumber"]}
                      label="Tổng sản phẩm"
                      rules={[{
                        required: true,
                        pattern: /^[0-9]+$/,
                        message: "Vui lòng nhập số"
                      }]}
                    >
                      <Input
                        style={{ borderRadius: 2 }}
                        placeholder="Nhập số lượng"
                      // value={lastName}
                      // onBlur={lastNameChangeHandle}
                      />
                    </Form.Item>
                    <Form.Item
                      name={["category", "brandId"]}
                      label="Brand"
                      rules={[{ level: true }]}
                    >
                      <Select
                        style={{ borderRadius: 2, width: 150 }}
                      // value={level}
                      // onChange={handleLevelChange}
                      >
                        <Option value="pepsi">Pepsi</Option>
                        <Option value="coke">CocaCola</Option>
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

export default ManageCategory;
