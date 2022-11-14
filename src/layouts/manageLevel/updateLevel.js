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

function UpdateLevel() {
  const [brand, setBrand] = useState("");
  const [levelDetail, setLevelDetail] = useState("");
  const [brandList, setBrandList] = useState([]);
  const [levelCode, setLevelCode] = useState("");
  const [levelName, setLevelName] = useState("");
  const [brandName, setBrandName] = useState("");
  const { levelId } = useParams();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const navigate = useNavigate();
  console.log(levelId);

  const axiosConfig = {
    method: "get",
    url: `http://oggycute.tplinkdns.com:31080/api/levels/${levelId}`,
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
        setLevelDetail(response.data);
        setLevelCode(response.data.code);
        setLevelName(response.data.name);
        setBrandName(response.data.brandId);
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
      "Content-Type": "application/json; charset=utf-8",
    },
  };
  useEffect(async () => {
    await axios(axiosConfigBrand)
      .then((response) => {
        JSON.stringify(response.data);
        setBrandList(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  return (
    <DashboardLayout>
      <MDBox pt={1} pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Card>
              <MDBox p={2} lineHeight={0} textAlign="center">
                <MDTypography variant="h5"> Level: {levelDetail.name}</MDTypography>
              </MDBox>
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
                      <Grid item xs={2.5}>
                        <MDTypography
                          fontSize={13}
                          variant="subtitle1"
                          color="black"
                          text-align="center"
                          padding="10px"
                        >
                          Mã Code
                        </MDTypography>
                      </Grid>
                      <TextField
                        // hiddenLabel
                        variant="outlined"
                        color="secondary"
                        // fullWidth
                        hiddenLabel
                        label=" "
                        InputLabelProps={{ shrink: false }}
                        sx={{ marginTop: 1 }}
                        inputProps={{
                          style: {
                            width: "300px",
                            height: "2px",
                            fontSize: 12,
                          },
                        }}
                        value={levelDetail.id}
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
                      <Grid item xs={2.5}>
                        <MDTypography
                          fontSize={13}
                          variant="subtitle1"
                          color="black"
                          text-align="center"
                          padding="10px"
                        >
                          Mức Độ
                        </MDTypography>
                      </Grid>
                      <TextField
                        // hiddenLabel
                        variant="outlined"
                        color="secondary"
                        // fullWidth
                        hiddenLabel
                        label=" "
                        InputLabelProps={{ shrink: false }}
                        sx={{ marginTop: 1 }}
                        inputProps={{
                          style: {
                            width: "300px",
                            height: "2px",
                            fontSize: 12,
                          },
                        }}
                        value={levelCode}
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
                      <Grid item xs={2.5}>
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
                      <MDBox sx={{ minWidth: "100px" }}>
                        <FormControl fullWidth sx={{ marginTop: 1 }}>
                          <Select
                            sx={{ minWidth: "275px", minHeight: "25px", fontSize: 12 }}
                            id="manager"
                            label=" "
                            notched={false}
                            shrink={false}
                            value={brandName}
                            onChange={handleBrandChange}
                          >
                            {brandList.map((braList) => (
                              <MenuItem value={braList.id}>{braList.name}</MenuItem>
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
                      <Grid item xs={1.9}>
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
                      <MDBox sx={{ minWidth: "100px" }} marginLeft={3}>
                        <FormControl fullWidth>
                          <FormControlLabel control={<Checkbox defaultChecked />} label="" />
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
                        navigate("/manageLevel");
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
                    >
                      Cập Nhật
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default UpdateLevel;
