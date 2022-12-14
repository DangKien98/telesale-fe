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
import { clvDevice } from "telesale";
import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { DatePicker } from "antd";
import "./customer.css";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  HttpTransportType,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from "@microsoft/signalr";
// import Select from "../../formUI/Select";

// console.log(process.env);
// const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const config = {
  host: "cf-pbx0001442.cfvn.cloud",
  port: "4433",
  displayName: "109",
  username: "109",
  password: "lX46l3Shr5",
  wsServers: "wss://rtc.cloudfone.vn:4433",
};
const device = new clvDevice(config);

// let device = new clvDevice(config);

// const callButton = () => {
//   let activeCall = device.initiateCall("1235556789");

//   activeCall.on("connecting", () => {
//     console.log("it's connecting!");
//   });
//   activeCall.on("accepted", () => {
//     console.log("We're on a phone call!");
//   });
// };


function UpdateCustomer() {
  const [, setOpen] = useState(false);
  const [, setHistoryCall] = useState("");
  const [customerDetail, setCustomerDetail] = useState("");
  const { customerId } = useParams();
  const [allUser, setAllUser] = useState([]);
  const [level, setLevel] = useState([]);
  const [levelDetail, setLevelDetail] = useState("");
  const [managerUser, setManagerUser] = useState("");
  const [customerGender, setCustomerGender] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [birthDate, setBirthday] = useState("");
  const [, setBrandId] = useState("");
  const [connection, setConnection] = useState();
  const [, setData] = useState();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [orderDetail, setOrderDetail] = useState([]);
  const url = "https://telesysapi227.amazingtech.vn/signalr";
  
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };
  const dateChange = (date, dateString) => {
    console.log(date, dateString);
    setBirthday(dateString);
  };
  const axiosConfigOrder = {
    method: "get",
    url: `http://oggycute.tplinkdns.com:31080/api/orders/customer/${customerId}`,
    data: {},
    headers: {
      Accept: "application/json; text/plain; */*",
      Authorization: `Bearer ${user.tokenString}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };
  useEffect(async () => {
    await axios(axiosConfigOrder)
      .then((response) => {
        JSON.stringify(response.data);
        setOrderDetail(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const updateCustomerHandle = (event) => {
    event.preventDefault();
    axios
      .patch(
        `http://oggycute.tplinkdns.com:31080/api/customers/${customerId}`,
        {
          firstName,
          lastName,
          phoneNumber,
          email,
          address,
          dayOfBith: birthDate,
          gender: Number(customerGender),
          totalOrder: customerDetail.totalOrder,
          status: customerDetail.status,
          channelId: customerDetail.channelId,
          levelId: levelDetail,
          userId: customerDetail.userId,
          brandId: customerDetail.brandId,
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
          // navigate("/manageCustomer");
        },
        (error) => {
          console.log(error);
        }
      );
    console.log(phoneNumber);
  };

  const callButton = () => {
    const activeCall = device.initiateCall(customerDetail.phoneNumber);
    console.log(customerDetail.phoneNumber);
    activeCall.on("connecting", () => {
      console.log("it's connecting!");
    });
    activeCall.on("accepted", () => {
      console.log("We're on a phone call!");
    });
  };

  useEffect(async () => {
    await axios
      .post("https://api.cloudfone.vn/api/CloudFone/GetCallHistory", {
        ServiceName: "CF-PBX0001442",
        AuthUser: "CF000072",
        AuthKey: "eea8c834-f0d5-4ff5-91fc-edabd0de9481",
        TypeGet: "0",
        HideFWOut: 1,
        DateStart: "2021-01-08 00:00:01",
        DateEnd: "2021-01-08 23:59:59",
        CallNum: "",
        ReceiveNum: "",
        Key: "",
        PageIndex: 1,
        PageSize: 200,
      })
      .then((response) => {
        setHistoryCall(response.data);
        console.log(response.data);
      });
  }, []);

  const axiosConfig = {
    method: "get",
    url: `http://oggycute.tplinkdns.com:31080/api/customers/${customerId}`,
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
        setCustomerDetail(response.data);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setPhoneNumber(response.data.phoneNumber);
        setEmail(response.data.email);
        setAddress(response.data.address);
        setLevelDetail(response.data.levelId);
        setManagerUser(response.data.userId);
        setBirthday(response.data.dayOfBith);
        setBrandId(response.data.brandId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const axiosConfigUser = {
    method: "get",
    url: `http://oggycute.tplinkdns.com:31080/api/users?status=1`,
    data: {},
    headers: {
      Accept: "application/json; text/plain; */*",
      Authorization: `Bearer ${user.tokenString}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };
  useEffect(async () => {
    await axios(axiosConfigUser)
      .then((response) => {
        JSON.stringify(response.data);
        setAllUser(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const axiosConfigLevel = {
    method: "get",
    url: `http://oggycute.tplinkdns.com:31080/api/levels`,
    data: {},
    headers: {
      Accept: "application/json; text/plain; */*",
      Authorization: `Bearer ${user.tokenString}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };
  useEffect(async () => {
    await axios(axiosConfigLevel)
      .then((response) => {
        JSON.stringify(response.data);
        setLevel(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    if (!connection) {
      const newConnection = new HubConnectionBuilder()
        .withUrl(url, {
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets,
        })
        .configureLogging(LogLevel.Debug)
        .withAutomaticReconnect()
        .build();
      setConnection(newConnection);
    }
  }, []);

  useEffect(() => {
    if (connection && connection?.state !== HubConnectionState.Connected) {
      connection.start().then(() => {
        connection.on("SendMessage", (data) => {
          setData(data.message);
          console.log(data);
        });
        connection.on("StatusWork", (data) => {
          console.log(data);
        });
      });
    }
  }, [{ ...connection }]);
  const joinRoom = async () => {
    const c = await connection.invoke("Send", "109", "0983475100");
    console.log(c);
  };
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleManagerChange = (e) => {
    setManagerUser(e.target.value);
  };
  const handleGenderChange = (e) => {
    setCustomerGender(e.target.value);
  };

  const handleLevelChange = (e) => {
    setLevelDetail(e.target.value);
  };

  function currencyFormat(num) {
    return `${num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")  }??`;
  }

  return (
    <DashboardLayout>
      <MDBox pt={1} pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Card>
              <MDBox p={2} lineHeight={0}>
                <MDTypography variant="h5">
                  {" "}
                  Kh??ch H??ng: {customerDetail.firstName} {customerDetail.lastName}
                </MDTypography>
                <MDTypography variant="button" color="text" fontWeight="regular">
                  M??y Nh??nh: 104
                </MDTypography>
              </MDBox>
              <form onSubmit={updateCustomerHandle}>
                <MDBox p={2} lineHeight={0}>
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
                        <Grid item xs={3.27}>
                          <MDTypography
                            fontSize={13}
                            variant="subtitle1"
                            color="black"
                            text-align="center"
                            padding="10px"
                          >
                            Ng?????i Ph??? Tr??ch
                          </MDTypography>
                        </Grid>
                        <MDBox sx={{ minWidth: "140px" }}>
                          <FormControl fullWidth sx={{ marginTop: 1 }}>
                            <Select
                              sx={{ minWidth: "220px", minHeight: "25px", fontSize: 12 }}
                              label=" "
                              notched={false}
                              shrink={false}
                              id="manager"
                              // value={`${customerDetail.username}`}
                              value={managerUser}
                              onChange={handleManagerChange}
                            >
                              {allUser.map((usermap) => (
                                <MenuItem style={{ fontSize: 12 }} value={usermap.user.id}>
                                  {usermap.user.userName}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
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
                            H??? KH
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
                              borderRadius: 90,
                            },
                          }}
                          value={firstName}
                          onChange={handleFirstName}
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
                            T??n Kh??ch H??ng
                          </MDTypography>
                        </Grid>
                        <TextField
                          // hiddenLabel
                          variant="outlined"
                          color="secondary"
                          fullWidth
                          hiddenLabel
                          sx={{ marginTop: 1 }}
                          label=" "
                          InputLabelProps={{ shrink: false }}
                          inputProps={{
                            style: {
                              height: "2px",
                              fontSize: 12,
                            },
                          }}
                          value={lastName}
                          onChange={handleLastName}
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
                            S??? ??i???n tho???i
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
                          value={phoneNumber}
                          onChange={handlePhoneNumber}
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
                            Email
                          </MDTypography>
                        </Grid>
                        <TextField
                          // hiddenLabel
                          variant="outlined"
                          color="secondary"
                          fullWidth
                          label=" "
                          InputLabelProps={{ shrink: false }}
                          sx={{ marginTop: 1 }}
                          inputProps={{
                            style: {
                              height: "2px",
                              fontSize: 12,
                            },
                          }}
                          value={email}
                          onChange={handleEmail}
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
                            ?????a Ch???
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
                          value={address}
                          onChange={handleAddress}
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
                        <Grid item xs={3.25}>
                          <MDTypography
                            fontSize={13}
                            variant="subtitle1"
                            color="black"
                            text-align="center"
                            padding="10px"
                          >
                            Level Kh??ch H??ng
                          </MDTypography>
                        </Grid>
                        <MDBox sx={{ minWidth: "50px" }}>
                          <FormControl fullWidth sx={{ marginTop: 1 }}>
                            <Select
                              sx={{ minWidth: "220px", minHeight: "25px", fontSize: 12 }}
                              id="manager"
                              label=" "
                              notched={false}
                              shrink={false}
                              value={levelDetail}
                              onChange={handleLevelChange}
                            >
                              {level.map((lev) => (
                                <MenuItem style={{ fontSize: 12 }} value={lev.id}>
                                  {lev.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
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
                        <Grid item xs={3.25}>
                          <MDTypography
                            fontSize={13}
                            variant="subtitle1"
                            color="black"
                            text-align="center"
                            padding="10px"
                          >
                            Gi???i T??nh
                          </MDTypography>
                        </Grid>
                        <MDBox sx={{ minWidth: "50px" }}>
                          <FormControl fullWidth sx={{ marginTop: 1 }}>
                            <Select
                              sx={{ minWidth: "70px", minHeight: "25px", fontSize: 12 }}
                              id="manager"
                              label=" "
                              notched={false}
                              shrink={false}
                              value={customerDetail.gender === 1 ? "1" : "0"}
                              onChange={handleGenderChange}
                            >
                              <MenuItem style={{ fontSize: 12 }} value="1">
                                Nam
                              </MenuItem>
                              <MenuItem style={{ fontSize: 12 }} value="0">
                                N???
                              </MenuItem>
                            </Select>
                          </FormControl>
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
                        <Grid item xs={3.25}>
                          <MDTypography
                            fontSize={13}
                            variant="subtitle1"
                            color="black"
                            text-align="center"
                            padding="10px"
                          >
                            Ng??y Sinh {console.log(birthDate)}
                          </MDTypography>
                        </Grid>
                        <MDBox sx={{ minWidth: "50px" }}>
                          <DatePicker
                            format="YYYY-MM-DD"
                            size="small"
                            style={{ marginTop: "8px", borderRadius: "5px" }}
                            value={moment(birthDate)}
                            onChange={dateChange}
                          />
                        </MDBox>
                      </MDBox>
                    </Grid>
                  </Grid>
                </MDBox>

                <MDBox p={2}>
                  <Grid container spacing={3} justifyContent="inherit" marginLeft={11}>
                    <Grid item xs={12} sm={6} lg={3}>
                      <MDButton
                        style={{ fontSize: "11px" }}
                        variant="gradient"
                        color="info"
                        fullWidth
                        onClick={() => {
                          navigate("/manageCustomer");
                        }}
                      >
                        Quay V???
                      </MDButton>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                      <MDButton
                        style={{ fontSize: "11px" }}
                        variant="gradient"
                        color="success"
                        fullWidth
                        type="submit"
                      >
                        C???p Nh???t
                      </MDButton>
                    </Grid>
                  </Grid>
                </MDBox>
              </form>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <MDBox p={2}>
                <Grid container justifyContent="inherit">
                  <Grid item xs={12} sm={6} lg={2.9} marginRight={1}>
                    <Link to={`/manageCustomer/orderItem/${customerId}`} target="_blank">
                      <MDButton
                        style={{ fontSize: "11px" }}
                        variant="gradient"
                        color="success"
                        fullWidth
                        onClick={handleOpen}
                      >
                        ?????t H??ng
                      </MDButton>
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={2.8} marginRight={1}>
                    <MDButton
                      style={{ fontSize: "11px" }}
                      variant="gradient"
                      color="info"
                      fullWidth
                    >
                      L???ch H???n
                    </MDButton>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={0.8} marginRight={5.5}>
                    <MDButton
                      style={{ fontSize: "11px" }}
                      variant="gradient"
                      color="primary"
                      fullWidth
                      onClick={() => {
                        joinRoom();
                        callButton();
                      }}
                    >
                      G???i
                    </MDButton>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3.9}>
                    <MDButton
                      style={{ fontSize: "11px" }}
                      variant="gradient"
                      color="warning"
                      fullWidth
                    >
                      L???ch s??? cu???c g???i
                    </MDButton>
                  </Grid>
                </Grid>
                <MDBox pb={2}>
                  <MDBox pb={4} xs={{ marginBottom: "4px" }} marginTop={4}>
                    <MDTypography variant="h5">L???ch s??? cu???c g???i</MDTypography>
                  </MDBox>
                  <MDBox lineHeight={0}>
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
                          <Grid item xs={5}>
                            <MDTypography
                              fontSize={13}
                              variant="subtitle1"
                              color="black"
                              text-align="center"
                              padding="10px"
                            >
                              Th???i Gian G???i
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
                            placeholder="Th???i Gian G???i Th???c"
                            disabled
                            sx={{ marginTop: 1 }}
                            inputProps={{
                              style: {
                                height: "2px",
                                fontSize: 12,
                              },
                            }}
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
                          <Grid item xs={5}>
                            <MDTypography
                              fontSize={13}
                              variant="subtitle1"
                              color="black"
                              text-align="center"
                              padding="10px"
                            >
                              Tr???ng Th??i
                            </MDTypography>
                          </Grid>
                          <TextField
                            // hiddenLabel
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            hiddenLabel
                            disabled
                            placeholder="N/A"
                            label=" "
                            InputLabelProps={{ shrink: false }}
                            sx={{ marginTop: 1 }}
                            inputProps={{
                              style: {
                                height: "2px",
                                fontSize: 12,
                              },
                            }}
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
                          <Grid item xs={5}>
                            <MDTypography
                              fontSize={13}
                              variant="subtitle1"
                              color="black"
                              text-align="center"
                              padding="10px"
                            >
                              Th???c g???i
                            </MDTypography>
                          </Grid>
                          <TextField
                            // hiddenLabel
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            hiddenLabel
                            disabled
                            placeholder="0"
                            label=" "
                            InputLabelProps={{ shrink: false }}
                            sx={{ marginTop: 1 }}
                            inputProps={{
                              style: {
                                height: "2px",
                                fontSize: 12,
                              },
                            }}
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
                          <Grid item xs={5}>
                            <MDTypography
                              fontSize={13}
                              variant="subtitle1"
                              color="black"
                              text-align="center"
                              padding="10px"
                            >
                              LinkFile
                            </MDTypography>
                          </Grid>
                          <TextField
                            // hiddenLabel
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            hiddenLabel
                            disabled
                            placeholder="0"
                            label=" "
                            InputLabelProps={{ shrink: false }}
                            sx={{ marginTop: 1 }}
                            inputProps={{
                              style: {
                                height: "2px",
                                fontSize: 12,
                              },
                            }}
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
                          <Grid item xs={5}>
                            <MDTypography
                              fontSize={13}
                              variant="subtitle1"
                              color="black"
                              text-align="center"
                              padding="10px"
                            >
                              Code
                            </MDTypography>
                          </Grid>
                          <TextField
                            // hiddenLabel
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            hiddenLabel
                            disabled
                            placeholder="0"
                            label=" "
                            InputLabelProps={{ shrink: false }}
                            sx={{ marginTop: 1 }}
                            inputProps={{
                              style: {
                                height: "2px",
                                fontSize: 12,
                              },
                            }}
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
                          <Grid item xs={5}>
                            <MDTypography
                              fontSize={13}
                              variant="subtitle1"
                              color="black"
                              text-align="center"
                              padding="10px"
                            >
                              Th??ng tin cu???c g???i
                            </MDTypography>
                          </Grid>
                          <TextField
                            // hiddenLabel
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            hiddenLabel
                            placeholder="Nh???p Ghi Ch??"
                            multiline
                            rows={4}
                            label=" "
                            InputLabelProps={{ shrink: false }}
                            sx={{ marginTop: 1 }}
                            inputProps={{
                              style: {
                                fontSize: 12,
                              },
                            }}
                          />
                        </MDBox>
                      </Grid>
                    </Grid>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox pb={1}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card sx={{ overflowX: "scroll" }}>
              <MDBox p={2} lineHeight={0}>
                <MDTypography variant="h5">L???ch s??? ????n h??ng</MDTypography>
              </MDBox>
              {orderDetail.map((ord) => (
                <MDBox p={2} lineHeight={0}>
                  <MDTypography variant="h6">
                    Ghi ch??: Mua h??ng ng??y{" "}
                    {new Date(`${ord.order.dateCreated}`).toLocaleDateString()}
                  </MDTypography>

                  <MDTypography sx={{ padding: 1 }}>
                    <table className="orderHistory">
                      <thead>
                        <tr>
                          <th>STT</th>
                          <th>M?? ????n h??ng</th>
                          <th>S???n ph???m</th>
                          <th>S??? l?????ng</th>
                          <th>????n gi??</th>
                          <th>Th??nh ti???n</th>
                        </tr>
                      </thead>
                      {ord.product.map((pro, index) => (
                        <tbody>
                          <tr>
                            <td>{index + 1}</td>
                            <td>{ord.order.code}</td>
                            <td>{pro.productName}</td>
                            <td>{pro.quantity}</td>
                            <td>{currencyFormat(pro.price)}</td>
                            <td>{currencyFormat(pro.price * pro.quantity)}</td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  </MDTypography>

                  <MDTypography variant="h6" sx={{ fontSize: 16, display: "flex" }}>
                    T???ng h??a ????n: &nbsp;
                    <MDTypography variant="h6" sx={{ color: "#bd0404" }}>
                      {currencyFormat(ord.order.amount)}
                    </MDTypography>
                  </MDTypography>
                  <MDTypography sx={{ overflow: "hidden" }}>
                    ----------------------------------------------------------------------------
                  </MDTypography>
                </MDBox>
              ))}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default UpdateCustomer;
