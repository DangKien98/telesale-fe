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

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

// import Select from "../../formUI/Select";

// console.log(process.env);
// const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
// let config = {
//   host: "wss://rtc.cloudfone.vn",
//   port: "4433",
//   wsServers: "wss://rtc.cloudfone.vn:4433",
//   displayName: "Phone User",
//   username: "104",
//   password: "Zaq@12345",
//   registrarServer: "sip:104@cf-pbx0001419.cfvn.cloud",
// };

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

function UpdateStore() {
  const [brandNameList, setBrandNameList] = useState([]);
  const [storeDetail, setStoreDetail] = useState("");
  const [storeCode, setStoreCode] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeBrand, setStoreBrand] = useState("");
  const [storePhone, setStorePhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState(false);
  const { storeId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login?.currentUser);
  console.log(storeId);

  const handleStoreName = (e) => {
    setStoreName(e.target.value);
  };
  const handleStoreCode = (e) => {
    setStoreCode(e.target.value);
  };
  const handleStoreBrand = (e) => {
    setStoreBrand(e.target.value);
  };
  const handleStorePhone = (e) => {
    setStorePhone(e.target.value);
  };
  const handleStoreEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleStoreAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleStatusChange = (e) => {
    setStatus(e.target.checked);
  };
  const axiosConfig = {
    method: "get",
    url: `http://oggycute.tplinkdns.com:31080/api/stores/${storeId}`,
    data: {},
    headers: {
      Accept: "application/json; text/plain; */*",
      Authorization: `Bearer ${user.tokenString}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  };
  useEffect(async () => {
    await axios(axiosConfig)
      .then((response) => {
        JSON.stringify(response.data);
        setStoreDetail(response.data);
        setStoreCode(response.data.code);
        setStoreName(response.data.name);
        setStoreBrand(response.data.brandId);
        setStorePhone(response.data.phoneNumber);
        setEmail(response.data.email);
        setAddress(response.data.address);
        setStatus(response.data.status === 1 ? true : false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const axiosConfigBrand = {
    method: "get",
    url: `http://oggycute.tplinkdns.com:31080/api/brands`,
    data: {},
    headers: {
      Accept: "application/json; text/plain; */*",
      Authorization: `Bearer ${user.tokenString}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  };
  useEffect(async () => {
    await axios(axiosConfigBrand)
      .then((response) => {
        JSON.stringify(response.data);
        setBrandNameList(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const updateStoreHandle = (event) => {
    event.preventDefault();
    axios
      .patch(
        `http://oggycute.tplinkdns.com:31080/api/stores/${storeId}`,
        {
          name: storeName,
          status: status === true ? 1 : 0,
          address: address,
          email: email,
          phoneNumber: storePhone,
          description: "abc",
          brandId: storeBrand,
          code: storeCode,
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
          navigate("/manageBranch");
        },
        (error) => {
          console.log(error);
        }
      );
  };
  return (
    <DashboardLayout>
      <MDBox pt={1} pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Card>
              <MDBox p={2} lineHeight={0}>
                <MDTypography variant="h5"> Chi Nhánh: {storeDetail.name}</MDTypography>
              </MDBox>
              <form onSubmit={updateStoreHandle}>
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
                        <Grid item xs={4}>
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
                          label=" "
                          InputLabelProps={{shrink: false}}
                          sx={{ marginTop: 1 }}
                          inputProps={{
                            style: {
                              height: "2px",
                              fontSize: 12,
                            },
                          }}
                          value={storeCode}
                          onChange={handleStoreCode}
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
                        <Grid item xs={4}>
                          <MDTypography
                            fontSize={13}
                            variant="subtitle1"
                            color="black"
                            text-align="center"
                            padding="10px"
                          >
                            Tên Cửa Hàng
                          </MDTypography>
                        </Grid>
                        <TextField
                          // hiddenLabel
                          variant="outlined"
                          color="secondary"
                          fullWidth
                          hiddenLabel
                          label=" "
                          InputLabelProps={{shrink: false}}
                          sx={{ marginTop: 1 }}
                          inputProps={{
                            style: {
                              height: "2px",
                              fontSize: 12,
                            },
                          }}
                          value={storeName}
                          onChange={handleStoreName}
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
                        <Grid item xs={3}>
                          <MDTypography
                            fontSize={13}
                            variant="subtitle1"
                            color="black"
                            text-align="center"
                            padding="10px"
                          >
                            Thương Hiệu
                          </MDTypography>
                        </Grid>
                        <MDBox sx={{ minWidth: "140px" }}>
                          <FormControl fullWidth sx={{ marginTop: 1 }}>
                            <Select
                              sx={{ minWidth: "275px", minHeight: "25px", fontSize: 12 }}
                              id="manager"
                              label=" "
                              notched={false}
                              shrink={false}
                              value={storeBrand}
                              onChange={handleStoreBrand}
                            >
                              {brandNameList.map((bra) => (
                                <MenuItem value={bra.id}>{bra.name}</MenuItem>
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
                        <Grid item xs={4}>
                          <MDTypography
                            fontSize={13}
                            variant="subtitle1"
                            color="black"
                            text-align="center"
                            padding="10px"
                          >
                            Số Điện Thoại
                          </MDTypography>
                        </Grid>
                        <TextField
                          // hiddenLabel
                          variant="outlined"
                          color="secondary"
                          fullWidth
                          hiddenLabel
                          label=" "
                          InputLabelProps={{shrink: false}}
                          sx={{ marginTop: 1 }}
                          inputProps={{
                            style: {
                              height: "2px",
                              fontSize: 12,
                            },
                          }}
                          value={storePhone}
                          onChange={handleStorePhone}
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
                        <Grid item xs={4}>
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
                          hiddenLabel
                          label=" "
                          InputLabelProps={{shrink: false}}
                          sx={{ marginTop: 1 }}
                          inputProps={{
                            style: {
                              height: "2px",
                              fontSize: 12,
                            },
                          }}
                          value={email}
                          onChange={handleStoreEmail}
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
                        <Grid item xs={4}>
                          <MDTypography
                            fontSize={13}
                            variant="subtitle1"
                            color="black"
                            text-align="center"
                            padding="10px"
                          >
                            Địa Chỉ
                          </MDTypography>
                        </Grid>
                        <TextField
                          // hiddenLabel
                          variant="outlined"
                          color="secondary"
                          fullWidth
                          hiddenLabel
                          label=" "
                          InputLabelProps={{shrink: false}}
                          sx={{ marginTop: 1 }}
                          inputProps={{
                            style: {
                              height: "2px",
                              fontSize: 12,
                            },
                          }}
                          value={address}
                          onChange={handleStoreAddress}
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
                        <Grid item xs={3}>
                          <MDTypography
                            fontSize={13}
                            variant="subtitle1"
                            color="black"
                            text-align="center"
                            padding="10px"
                          >
                            Hiển Thị
                          </MDTypography>
                        </Grid>
                        <MDBox sx={{ minWidth: "100px" }}>
                          <FormControl fullWidth>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  defaultChecked
                                  checked={status}
                                  onChange={handleStatusChange}
                                />
                              }
                              label="Hiển Thị"
                            />
                          </FormControl>
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
                          navigate("/dashboard");
                        }}
                      >
                        Quay Về
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
                        Cập Nhật
                      </MDButton>
                    </Grid>
                  </Grid>
                </MDBox>
              </form>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default UpdateStore;
