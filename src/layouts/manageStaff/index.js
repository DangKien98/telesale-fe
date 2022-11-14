import { Box, Card, Grid } from "@mui/material";
import { DatePicker, Space } from "antd";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import DataTable from "examples/Tables/DataTable";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
// import { Link } from "react-router-dom";

const { default: DashboardLayout } = require("examples/LayoutContainers/DashboardLayout");
const { default: DashboardNavbar } = require("examples/Navbars/DashboardNavbar");

function ManageStaff() {
    const { sales } = reportsLineChartData;
    function table() {
        return {
            columns: [
                { Header: "STT", accessor: "no", align: "center" },
                { Header: "Tên nhân viên", accessor: "staffName", align: "center" },
                { Header: "Username", accessor: "name", align: "center" },
                { Header: "Trạng thái", accessor: "status", align: "center" },
                { Header: "Máy nhánh", accessor: "branch", align: "center" },
                { Header: "Thời gian online", accessor: "onlineTime", align: "center" },
                { Header: "Thời lượng gọi", accessor: "callTime", align: "center" },
                { Header: "Cuộc gọi trên giờ", accessor: "callPerHour", align: "center" },
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
                staffName: (
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
                name: (
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
                status: (
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
                branch: (
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
                onlineTime: (
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
                callTime: (
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
                callPerHour: (
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
    function tableCallPerDate() {
        return {
            columns: [
                { Header: "STT", accessor: "no", align: "center" },
                { Header: "Tên nhân viên", accessor: "staffName", align: "center" },
                { Header: "~1 phút", accessor: "oneMin", align: "center" },
                { Header: "~2 phút", accessor: "twoMin", align: "center" },
                { Header: "~3 phút", accessor: "threeMin", align: "center" },
                { Header: "< 3 phút", accessor: "smallerThreeMin", align: "center" },
                { Header: "No answered", accessor: "noAnswered", align: "center" },
                { Header: "Tổng cuộc gọi", accessor: "callTotal", align: "center" },
                { Header: "N/A", accessor: "notAvailable", align: "center" },
                { Header: "Hóa đơn/Cuộc gọi", accessor: "billPerCall", align: "center" },
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
                staffName: (
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
                oneMin: (
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
                twoMin: (
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
                threeMin: (
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
                smallerThreeMin: (
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
                noAnswered: (
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
                callTotal: (
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
                notAvailable: (
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
                billPerCall: (
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
    function tableCallPerMonth() {
        return {
            columns: [
                { Header: "STT", accessor: "no", align: "center" },
                { Header: "Tên nhân viên", accessor: "staffName", align: "center" },
                { Header: "~1 phút", accessor: "oneMin", align: "center" },
                { Header: "~2 phút", accessor: "twoMin", align: "center" },
                { Header: "~3 phút", accessor: "threeMin", align: "center" },
                { Header: "< 3 phút", accessor: "smallerThreeMin", align: "center" },
                { Header: "No answered", accessor: "noAnswered", align: "center" },
                { Header: "Tổng cuộc gọi", accessor: "callTotal", align: "center" },
                { Header: "N/A", accessor: "notAvailable", align: "center" },
                { Header: "Hóa đơn/Cuộc gọi", accessor: "billPerCall", align: "center" },
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
                staffName: (
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
                oneMin: (
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
                twoMin: (
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
                threeMin: (
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
                smallerThreeMin: (
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
                noAnswered: (
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
                callTotal: (
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
                notAvailable: (
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
                billPerCall: (
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
    const { columns: callColumns, rows: callRows } = tableCallPerDate();
    const { columns: callMColumns, rows: callMRows } = tableCallPerMonth();
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
            <MDTypography sx={{ fontWeight: "bold" }}>Báo cáo ngày</MDTypography>
                <MDBox mb={5} sx={{ display: "flex" }}>
                    <Space>
                        <DatePicker format="DD/MM/yyyy" />
                        <MDTypography sx={{ fontWeight: "bold" }}>To</MDTypography>
                        <DatePicker format="DD/MM/yyyy" />
                    </Space>
                </MDBox>
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
                                        Báo cáo ngày 31/10/2022
                                    </MDTypography>
                                </Box>
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
                                        Báo cáo cuộc gọi ngày 31/10/2022
                                    </MDTypography>
                                </Box>
                            </MDBox>
                            <MDBox pt={3}>
                                <DataTable
                                    table={{ columns: callColumns, rows: callRows }}
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
            <MDBox mt={1}>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={6} lg={12}>
                        <MDBox mb={3}>
                            <ReportsLineChart
                                color="success"
                                title="Thống kê cuộc gọi trong ngày ...:"
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
                                        Báo cáo cuộc gọi tháng 10/2022
                                    </MDTypography>
                                </Box>
                            </MDBox>
                            <MDBox pt={3}>
                                <DataTable
                                    table={{ columns: callMColumns, rows: callMRows }}
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
            <MDBox mt={1}>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={6} lg={12}>
                        <MDBox mb={3}>
                            <ReportsLineChart
                                color="dark"
                                title="Thống kê cuộc gọi trong tháng ...:"
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
        </DashboardLayout>
    )
};

export default ManageStaff;