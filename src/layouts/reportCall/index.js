import { Box, Card, Grid } from "@mui/material";
import { DatePicker, Select, Space } from "antd";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import DataTable from "examples/Tables/DataTable";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
// import { Link } from "react-router-dom";

const { default: DashboardLayout } = require("examples/LayoutContainers/DashboardLayout");
const { default: DashboardNavbar } = require("examples/Navbars/DashboardNavbar");

function ReportCall() {
    const { sales } = reportsLineChartData;
    const { Option } = Select;
    function table() {
        return {
            columns: [
                { Header: "STT", accessor: "no", align: "center" },
                { Header: "Ngày", accessor: "date", align: "center" },
                { Header: "Nghe máy", accessor: "pickupCall", align: "center" },
                { Header: "Từ chối", accessor: "dropCall", align: "center" },
                { Header: "Tổng", accessor: "total", align: "center" },
            ],
            rows: [{
                no: (
                    // <Link to="#">
                    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"
                        sx={[
                            {
                                "&:hover": {
                                    color: "#04bd95",
                                },
                            },
                        ]}
                    >
                        1
                    </MDTypography>
                    // </Link>
                ),
                date: (
                    // <Link to="#">
                    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"
                        sx={[
                            {
                                "&:hover": {
                                    color: "#04bd95",
                                },
                            },
                        ]}
                    >
                        1
                    </MDTypography>
                    // </Link>
                ),
                pickupCall: (
                    // <Link to="#">
                    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"
                        sx={[
                            {
                                "&:hover": {
                                    color: "#04bd95",
                                },
                            },
                        ]}
                    >
                        1
                    </MDTypography>
                    // </Link>
                ),
                dropCall: (
                    // <Link to="#">
                    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"
                        sx={[
                            {
                                "&:hover": {
                                    color: "#04bd95",
                                },
                            },
                        ]}
                    >
                        1
                    </MDTypography>
                    // </Link>
                ),
                total: (
                    // <Link to="#">
                    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"
                        sx={[
                            {
                                "&:hover": {
                                    color: "#04bd95",
                                },
                            },
                        ]}
                    >
                        1
                    </MDTypography>
                    // </Link>
                ),
            }],
        };
    };
    const { columns, rows } = table();
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>
                <MDTypography sx={{ fontWeight: "bold" }}>Báo cáo ngày</MDTypography>
                <MDBox sx={{ display: "flex" }}>
                    <Space>
                        <DatePicker format="DD/MM/yyyy" />
                        <MDTypography sx={{ fontWeight: "bold" }}>To</MDTypography>
                        <DatePicker format="DD/MM/yyyy" />
                    </Space>
                </MDBox>
                <MDTypography sx={{ fontWeight: "bold" }}>Thống kê theo ngày: 31/10/2022</MDTypography>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={6} lg={5}>
                        <MDBox mb={1.5}>
                            <ComplexStatisticsCard
                                color="dark"
                                icon="call"
                                title="Tổng cuộc gọi"
                                count={281}
                            // percentage={{
                            //   color: "success",
                            //   amount: "+55%",
                            //   label: "than lask week",
                            // }}
                            />
                        </MDBox>
                        <MDBox mb={1.5}>
                            <ComplexStatisticsCard
                                color="success"
                                icon="phone_in_talk"
                                title="Nghe máy"
                                count={281}
                            // percentage={{
                            //   color: "success",
                            //   amount: "+55%",
                            //   label: "than lask week",
                            // }}
                            />
                        </MDBox>
                        <MDBox mb={1.5}>
                            <ComplexStatisticsCard
                                color="error"
                                icon="phone_missed"
                                title="Không trả lời"
                                count={281}
                            // percentage={{
                            //   color: "success",
                            //   amount: "+55%",
                            //   label: "than lask week",
                            // }}
                            />
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={7}>
                        <MDBox mb={1.5} sx={{ height: "96.5%" }}>
                            <ReportsLineChart
                                color="success"
                                title="Tổng Hóa đơn trong tháng 0:"
                                // description={
                                //   <>
                                //     (<strong>+15%</strong>) increase in today sales.
                                //   </>
                                // }
                                // date="updated 4 min ago"
                                chart={sales}
                            />
                        </MDBox>
                    </Grid>
                </Grid>
            </MDBox>
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
                                        Cuộc gọi chi tiết theo ngày
                                    </MDTypography>
                                </Box>
                            </MDBox>
                            <MDBox mt={1} ml={2}>
                                <Select placeholder="Chọn" style={{ borderRadius: 5, width: 150 }}>
                                    <Option value="1">Theo ngày</Option>
                                    <Option value="2">Theo channel</Option>
                                    <Option value="2">Theo agent</Option>
                                </Select>
                            </MDBox>
                            <MDBox pt={3}>
                                <DataTable
                                    table={{ columns, rows }}
                                    isSorted="true"
                                    canSearch={false}
                                    entriesPerPage={false}
                                    showTotalEntries={false}
                                    noEndBorder
                                />
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    )
};

export default ReportCall;