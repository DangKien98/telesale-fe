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
  const [product, setProduct] = useState([]);
  const user = useSelector((state) => state.auth.login?.currentUser);

  const axiosConfig = {
    method: "get",
    url: "http://oggycute.tplinkdns.com:31080/api/products",
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
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(user.tokenString);
        console.log(error);
      });
  }, []);

  return {
    columns: [
      { Header: "STT", accessor: "id", align: "center" },
      { Header: "Tên", accessor: "name", align: "center" },
      { Header: "Danh mục", accessor: "category", align: "center" },
      { Header: "Giá Cũ", accessor: "oldPrice", align: "center" },
      { Header: "Giá mới", accessor: "newPrice", align: "center" },
      { Header: "Ngày tạo", accessor: "dateCreate", align: "center" },
      { Header: "Edit", accessor: "edit", align: "center" },
      { Header: "Delete", accessor: "delete", align: "center" },
    ],
    rows: [
      ...product.map((pro) => ({
        id: (
          <Link to={`/manageProduct/updateProduct/${product.id}`} key={product.id}>
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"
              sx={[
                {
                  "&:hover": {
                    color: "#04bd95",
                  },
                },
              ]}
            >
              {pro.id}
            </MDTypography>
          </Link>
        ),
        name: (
          <Link to={`/manageProduct/updateProduct/${product.id}`} key={product.id}>
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"
              sx={[
                {
                  "&:hover": {
                    color: "#04bd95",
                  },
                },
              ]}
            >
              {pro.name}
            </MDTypography>
          </Link>
        ),
        category: (
          <Link to={`/manageProduct/updateProduct/${product.id}`} key={product.id}>
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"
              sx={[
                {
                  "&:hover": {
                    color: "#04bd95",
                  },
                },
              ]}
            >
              {pro.productCategoryName}
            </MDTypography>
          </Link>
        ),
        oldPrice: (
          <Link to={`/manageProduct/updateProduct/${product.id}`} key={product.id}>
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"
              sx={[
                {
                  "&:hover": {
                    color: "#04bd95",
                  },
                },
              ]}
            >
              {pro.oldPrice}
            </MDTypography>
          </Link>
        ),
        newPrice: (
          <Link to={`/manageProduct/updateProduct/${product.id}`} key={product.id}>
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"
              sx={[
                {
                  "&:hover": {
                    color: "#04bd95",
                  },
                },
              ]}
            >
              {pro.price}
            </MDTypography>
          </Link>
        ),
        dateCreate: (
          <Link to={`/manageProduct/updateProduct/${product.id}`} key={product.id}>
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"
              sx={[
                {
                  "&:hover": {
                    color: "#04bd95",
                  },
                },
              ]}
            >
              {new Date(`${pro.dateCreated}`).toLocaleDateString()}
            </MDTypography>
          </Link>
        ),

        edit: (
          <Link to={`/manageProduct/updateProduct/${product.id}`} key={product.id}>
            <MDButton>
              <EditIcon color="info">.</EditIcon>
            </MDButton>
          </Link>
        ),
        delete: (
          <MDButton>
            <CancelIcon color="error">.</CancelIcon>
          </MDButton>
        ),
      })),
    ],
  };
}

function ManageProduct() {
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
                  <MDTypography variant="h6" color="white" text-align="center" padding="10px">
                    Sản phẩm
                  </MDTypography>
                  <MDButton variant="gradient" color="dark" onClick={handleOpen}>
                    <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                    &nbsp;Thêm Sản phẩm
                  </MDButton>
                </Box>
                <Modal
                  visible={open}
                  title="Thêm Sản Phẩm"
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
                        Thêm sản phẩm
                      </Button>
                    </div>,
                  ]}
                >
                  <Form form={form} {...layout} validateMessages={FORM_VALIDATION} onFinish={onFinish}>
                    <Form.Item
                      name={["product", "name"]}
                      label="Tên sản phẩm"
                      rules={[{ required: true }]}
                    >
                      <Input
                        style={{ borderRadius: 2 }}
                        placeholder="Nhập tên sản phẩm"
                      // value={firstName}
                      // onBlur={firstNameChangeHandle}
                      />
                    </Form.Item>
                    <Form.Item
                      name={["product", "oldPrice"]}
                      label="Giá cũ"
                      rules={[{
                        required: true,
                        pattern: /^[0-9]+$/,
                        message: "Vui lòng nhập số"
                      }]}
                    >
                      <Input
                        style={{ borderRadius: 2 }}
                        placeholder="Nhập giá cũ"
                      // value={lastName}
                      // onBlur={lastNameChangeHandle}
                      />
                    </Form.Item>
                    <Form.Item
                      name={["product", "price"]}
                      label="Giá mới"
                      rules={[{
                        required: true,
                        pattern: /^[0-9]+$/,
                        message: "Vui lòng nhập số"
                      }]}
                    >
                      <Input
                        style={{ borderRadius: 2 }}
                        placeholder="Nhập giá mới"
                      // value={lastName}
                      // onBlur={lastNameChangeHandle}
                      />
                    </Form.Item>
                    <Form.Item
                      name={["product", "productCategoryId"]}
                      label="Danh mục"
                      rules={[{ level: true }]}
                    >
                      <Select
                        style={{ borderRadius: 2, width: 150 }}
                      // value={level}
                      // onChange={handleLevelChange}
                      >
                        <Option value="1">Nước ngọt</Option>
                        <Option value="2">Snack</Option>
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

export default ManageProduct;
