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

import { Checkbox, FormControl, FormControlLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

function UpdateChannel() {
  const [source, setSource] = useState("");

  const navigate = useNavigate();

  const handleSourceChange = (e) => {
    setSource(e.target.value);
  };

  return (
    <DashboardLayout>
      <MDBox pt={1} pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Card>
              <MDBox p={2} lineHeight={0}>
                <MDTypography variant="h5"> Kênh: MK20</MDTypography>
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
                      <Grid item xs={6}>
                        <MDTypography fontSize={13} variant="subtitle1" color="black" text-align="center" padding="10px">
                          Mã Kênh
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
                            fontSize: 12
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
                      <Grid item xs={6}>
                        <MDTypography fontSize={13} variant="subtitle1" color="black" text-align="center" padding="10px">
                          Tên Kênh
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
                            fontSize: 12
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
                      <Grid item xs={4}>
                        <MDTypography fontSize={13} variant="subtitle1" color="black" text-align="center" padding="10px">
                          Nguồn Khách Hàng
                        </MDTypography>
                      </Grid>
                      <MDBox sx={{ minWidth: "100px" }}>
                        <FormControl fullWidth sx={{ marginTop: 1 }}>
                          <Select
                            sx={{ minWidth: "200px", minHeight: "25px", fontSize: 12 }}
                            id="manager"
                            value={source}
                            label=" "
                            notched={false}
                            shrink={false}
                            onChange={handleSourceChange}

                          >
                            <MenuItem style={{ fontSize: 12 }} value="Another">Source Khác</MenuItem>
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
                      <Grid item xs={6}>
                        <MDTypography fontSize={13} variant="subtitle1" color="black" text-align="center" padding="10px">
                          Chi Phí Dự Kiến
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
                            fontSize: 12
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
                      <Grid item xs={6}>
                        <MDTypography fontSize={13} variant="subtitle1" color="black" text-align="center" padding="10px">
                          Doanh Thu Dự Kiến
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
                            fontSize: 12
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
                      <Grid item xs={4}>
                        <MDTypography fontSize={13} variant="subtitle1" color="black" text-align="center" padding="10px">
                          Hiển Thị
                        </MDTypography>
                      </Grid>
                      <MDBox sx={{ minWidth: "100px" }} marginRight={24}>
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
                        navigate("/dashboard");
                      }}
                    >
                      Quay Về
                    </MDButton>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4}>
                    <MDButton style={{ fontSize: "11px" }} variant="gradient" color="success" fullWidth>
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

export default UpdateChannel;
