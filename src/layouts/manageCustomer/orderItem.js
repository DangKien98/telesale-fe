// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// import { clvDevice } from "clv-sipjs";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import jwtDecode from "jwt-decode";
import { IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { DatePicker } from "antd";
import "./customer.css";
import moment from "moment";
import { useSelector } from "react-redux";
import DataTable from "examples/Tables/DataTable";
import MDSnackbar from "components/MDSnackbar";

// import Select from "../../formUI/Select";

// console.log(process.env);
// const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

function OrderItem() {
  const [product, setProduct] = useState([]);
  const [customerOrder, setCustomerOrder] = useState([]);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [ setStore] = useState([]);
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [note, setNote] = useState("");
  const [date, setBirthDate] = useState(new Date());
  const { customerId } = useParams();
  const [successSB, setSuccessSB] = useState(false);
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const navigate = useNavigate();
  const currencyFormat = (num) => `${num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")  }đ`
  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Đặt hàng thành công"
      dateTime="vài giày trước"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const currentUser = jwtDecode(user.tokenString);
  const [brandId, setBrandId] = useState(currentUser.BrandId);
  
  const noteChangeHandler = (e) => {
    setNote(e.target.value);
  };
  const dateChange = (dateString) => {
    setBirthDate(dateString);
  };

  const axiosConfigCustomer = {
    method: "get",
    url: `http://oggycute.tplinkdns.com:31080/api/customers/${customerId}`,
    data: {},
    headers: {
      Accept: "application/json; text/plain; */*",
      Authorization: `Bearer ${user.tokenString}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  };
  useEffect(() => {
    axios(axiosConfigCustomer)
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
  const sendOrderHandler = async () => {
    await axios
      .post(
        `http://oggycute.tplinkdns.com:31080/api/orders`,
        {
          levelId: customer.levelId,
          brandId: customer.brandId,
          dataUserID: customer.id,
          userId: customer.userId,
          amount: totalAmount,
          note,
          expectedDate: date,
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
          console.log(response.data);
          console.log("add succes");
          console.log(123);
          navigate(`/manageCustomer/updateCustomer/${customerId}`);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const hasItem = cart.length > 0;
  let quantity = 0;

  const axiosConfig = {
    method: "get",
    url: "http://oggycute.tplinkdns.com:31080/api/products",
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
        setProduct(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const axiosCustomerConfig = {
    method: "get",
    url: `http://oggycute.tplinkdns.com:31080/api/carts/${customerId}`,
    data: {},
    headers: {
      Accept: "application/json; text/plain; */*",
      Authorization: `Bearer ${user.tokenString}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  };
  useEffect(() => {
    axios(axiosCustomerConfig)
      .then((response) => {
        console.log(response);
        JSON.stringify(response.data);
        setCustomerOrder(response.data);
        setBrandId(response.data.brandId);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const axiosStoreConfig = {
    method: "get",
    url: `http://oggycute.tplinkdns.com:31080/api/stores/brand/${brandId}`,
    data: {},
    headers: {
      Accept: "application/json; text/plain; */*",
      Authorization: `Bearer ${user.tokenString}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  };
  useEffect(() => {
    axios(axiosStoreConfig)
      .then((response) => {
        console.log(response);
        JSON.stringify(response.data);
        setStore(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleClick = (pro) => {
    const updateTotalPrice = totalAmount + pro.price;

    const existingCartItemIndex = cart.findIndex((item) => item.id === pro.id);

    const existingCartItem = cart[existingCartItemIndex];

    let updateItems;

    if (existingCartItem) {
      quantity += quantity + 1;
      const updateItem = {
        ...existingCartItem,
        amount: Number(existingCartItem.price) + existingCartItem.price,
        quantity,
      };
      updateItems = [...cart];
      updateItems[existingCartItemIndex] = updateItem;
    } else {
      quantity += quantity + 1;
      updateItems = cart.concat({
        ...pro,
        quantity,
      });
    }
    setCart(updateItems);
    setTotalAmount(updateTotalPrice);

    axios
      .post(
        `http://oggycute.tplinkdns.com:31080/api/carts/product`,
        {
          cartId: customerOrder.id,
          productId: pro.id,
          quantity,
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
          console.log(response.data);
          console.log("add succes");
        },
        (error) => {
          console.log(error);
        }
      );

    return quantity;
  };
  console.log(cart);
  console.log(totalAmount);
  function tableCart() {
    return {
      columns: [
        { Header: "STT", accessor: "no", align: "center" },
        { Header: "Tên sản phẩm", accessor: "productname", align: "center" },
        { Header: "Tổng tiền", accessor: "totalPrice", align: "center" },
        { Header: "Số lượng", accessor: "quantity", align: "center" },
        { Header: "", accessor: "remove", align: "center" },
      ],
      rows: [
        // eslint-disable-next-line no-unsafe-optional-chaining
        ...cart?.map((item, index) => ({
          no: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {index + 1}
            </MDTypography>
          ),
          productname: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {item.name}
            </MDTypography>
          ),
          totalPrice: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {currencyFormat(item.price)}
            </MDTypography>
          ),
          quantity: (
            <TextField
              size="small"
              label=" "
              InputLabelProps={{ shrink: false }}
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                style: {
                  height: "4px",
                  width: "40px",
                  fontSize: 12,
                  fontWeidght: "medium",
                  textAlign: "center",
                },
              }}
              value={item.quantity}
            />
          ),
          remove: (
            <IconButton size="small">
              <RemoveIcon color="info">.</RemoveIcon>
            </IconButton>
          ),
        })),
      ],
    };
  }
  function table() {
    // const updateHandler = (no) => {
    //   navigate(`/update/${params.no}`);
    // };

    return {
      columns: [
        { Header: "STT", accessor: "no", align: "center" },
        { Header: "Tên sản phẩm", accessor: "productname", align: "center" },
        { Header: "Giá tiền", accessor: "price", align: "center" },
        { Header: "Add", accessor: "add", align: "center" },
      ],
      rows: [
        ...product.map((pro, index) => ({
          no: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {index + 1}
            </MDTypography>
          ),
          productname: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {pro.name}
            </MDTypography>
          ),
          price: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {currencyFormat(pro.price)}
            </MDTypography>
          ),
          add: (
            <IconButton size="small">
              <AddIcon color="info" onClick={handleClick(null, pro)}>
                .
              </AddIcon>
            </IconButton>
          ),
        })),
      ],
    };
  }

  const { columns, rows } = table();
  const { columns: cartColumns, rows: cartRows } = tableCart();
  const name = `${customerOrder.firstName} + " " + ${customerOrder.lastName}`;
  
  return (
    <DashboardLayout>
      <MDBox pt={1} pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Card>
              <MDBox p={2}>
                <MDBox pb={0} xs={{ marginBottom: "4px" }} marginRight={2}>
                  <MDTypography variant="h5">Danh sách sản phẩm</MDTypography>
                </MDBox>
                <Grid container justifyContent="inherit">
                  {" "}
                  <DataTable
                    table={{ columns, rows }}
                    isSorted="true"
                    entriesPerPage="true"
                    showTotalEntries={false}
                  />
                </Grid>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <MDBox p={2}>
                <MDBox pb={2}>
                  <MDBox pb={0} sx={{ display: "flex", justifyContent: "space-between" }}>
                    <MDTypography variant="h5">Lịch sử cuộc gọi</MDTypography>
                    <Grid item xs={12} sm={6} lg={2.8} marginRight={1}>
                      <MDButton
                        style={{ fontSize: "11px" }}
                        variant="gradient"
                        color="primary"
                        fullWidth
                        key="submit"
                        onClick={() => {
                          openSuccessSB();
                          sendOrderHandler();
                          // sendProductHandler();
                        }}
                      >
                        Đặt hàng
                      </MDButton>

                      {renderSuccessSB}
                    </Grid>
                  </MDBox>
                  <MDBox p={1} lineHeight={0}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <MDBox
                          sx={{
                            display: "flex",
                            justifyContent: "inherit",
                            alignContent: "center",
                            marginBottom: "-10px",
                          }}
                        >
                          <Grid item xs={4.45}>
                            <MDTypography
                              fontSize={13}
                              variant="subtitle1"
                              color="black"
                              text-align="center"
                              padding="10px"
                            >
                              Khách Hàng
                            </MDTypography>
                          </Grid>
                          <TextField
                            // hiddenLabel
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            hiddenLabel
                            label=" "
                            disabled
                            InputLabelProps={{ shrink: false }}
                            sx={{ marginTop: 1 }}
                            inputProps={{
                              style: {
                                fontWeight: "600",
                                height: "2px",
                                fontSize: 13,
                              },
                            }}
                            value={name}
                          />
                        </MDBox>
                        <MDBox
                          sx={{
                            display: "flex",
                            justifyContent: "inherit",
                            alignContent: "center",
                            marginBottom: "-10px",
                          }}
                        >
                          <Grid item xs={4.45}>
                            <MDTypography
                              fontSize={13}
                              variant="subtitle1"
                              color="black"
                              text-align="center"
                              padding="10px"
                            >
                              Số điện thoại
                            </MDTypography>
                          </Grid>
                          <TextField
                            // hiddenLabel
                            variant="outlined"
                            color="secondary"
                            disabled
                            fullWidth
                            hiddenLabel
                            label=" "
                            InputLabelProps={{ shrink: false }}
                            sx={{ marginTop: 1 }}
                            inputProps={{
                              style: {
                                fontWeight: "600",
                                height: "2px",
                                fontSize: 13,
                              },
                            }}
                            value={customerOrder.phoneNumber}
                          />
                        </MDBox>
                        <MDBox
                          sx={{
                            display: "flex",
                            justifyContent: "inherit",
                            alignContent: "center",
                            marginBottom: "-10px",
                          }}
                        >
                          <Grid item xs={4.45}>
                            <MDTypography
                              fontSize={13}
                              variant="subtitle1"
                              color="black"
                              text-align="center"
                              padding="10px"
                            >
                              Địa chỉ:
                            </MDTypography>
                          </Grid>
                          <TextField
                            // hiddenLabel
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            disabled
                            hiddenLabel
                            label=" "
                            InputLabelProps={{ shrink: false }}
                            sx={{ marginTop: 1 }}
                            inputProps={{
                              style: {
                                fontWeight: "600",
                                height: "2px",
                                fontSize: 13,
                              },
                            }}
                            value={customerOrder.address}
                          />
                        </MDBox>

                        <MDBox
                          sx={{
                            display: "flex",
                            justifyContent: "inherit",
                            alignContent: "center",
                            marginBottom: "-10px",
                          }}
                        >
                          <Grid item xs={4.5}>
                            <MDTypography
                              fontSize={13}
                              variant="subtitle1"
                              color="black"
                              text-align="center"
                              padding="10px"
                            >
                              Thành tiền
                            </MDTypography>
                          </Grid>
                          <TextField
                            // hiddenLabel
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            hiddenLabel
                            label=" "
                            InputLabelProps={{ shrink: false }}
                            sx={{ marginTop: 1 }}
                            inputProps={{
                              style: {
                                height: "2px",
                                fontSize: 12,
                              },
                            }}
                            value={currencyFormat(totalAmount)}
                          />
                        </MDBox>
                        <MDBox
                          sx={{
                            display: "flex",
                            justifyContent: "inherit",
                            alignContent: "center",
                            marginBottom: "-10px",
                          }}
                        >
                          <Grid item xs={3.27}>
                            <MDTypography
                              fontSize={13}
                              variant="subtitle1"
                              color="black"
                              text-align="center"
                              padding="10px"
                            >
                              Ngày dự kiến:
                            </MDTypography>
                          </Grid>
                          <MDBox sx={{ minWidth: "0px" }}>
                            <DatePicker
                              format="YYYY-MM-DD"
                              size="small"
                              style={{
                                fontSize: "12px",
                                marginRight: "40px",
                                marginTop: "8px",
                                borderRadius: "5px",
                                width: "200px",
                              }}
                              value={moment(date)}
                              onChange={dateChange}
                            />
                          </MDBox>
                        </MDBox>

                        <MDBox
                          sx={{
                            display: "flex",
                            justifyContent: "inherit",
                            alignContent: "center",
                            marginBottom: "-10px",
                          }}
                        >
                          <Grid item xs={4.5}>
                            <MDTypography
                              fontSize={13}
                              variant="subtitle1"
                              color="black"
                              text-align="center"
                              padding="10px"
                            >
                              Ghi chú
                            </MDTypography>
                          </Grid>
                          <TextField
                            // hiddenLabel
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            hiddenLabel
                            label=" "
                            InputLabelProps={{ shrink: false }}
                            sx={{ marginTop: 1 }}
                            inputProps={{
                              style: {
                                height: "2px",
                                fontSize: 12,
                              },
                            }}
                            value={note}
                            onChange={noteChangeHandler}
                          />
                        </MDBox>
                        {/* <MDBox></MDBox> */}
                      </Grid>
                    </Grid>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox>
        <Grid container spacing={3}>
          <Grid item xs={6} />
          <Grid item xs={6}>
            <Card>
              <MDBox p={2}>
                <MDBox pb={0} xs={{ marginBottom: "4px" }} marginRight={2}>
                  <MDTypography variant="h5">Hóa đơn</MDTypography>
                </MDBox>
                <Grid>
                  {hasItem && (
                    <DataTable
                      table={{ columns: cartColumns, rows: cartRows }}
                      canSearch={false}
                      isSorted={false}
                      entriesPerPage={false}
                      showTotalEntries={false}
                    />
                  )}
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default OrderItem;
