import { Card } from "@mui/material";
import { Select } from "antd";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SelectBrand() {
    const [listBrand, setListBrand] = useState([]);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const currentUser = jwtDecode(user.tokenString);
    const { Option } = Select;
    const [brandID, setBrandID] = useState([]);
    const navigate = useNavigate(); 

    const axiosConfig = {
        method: "get",
        url: `http://oggycute.tplinkdns.com:31080/api/users/brand-mapping/${currentUser.Id}`,
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
                setListBrand(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    console.log(listBrand);

    const brandChange = (value) => {
        setBrandID(value);
    }

    function selectBrand(){
        console.log(brandID);
        localStorage.setItem("brandID", brandID);
        localStorage.setItem("refresh","load");
        navigate("/manageCustomer")
    }

    return (
        <BasicLayout image={bgImage}>
            <Card>
                <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                    mx={2}
                    mt={-3}
                    p={2}
                    mb={1}
                    textAlign="center"
                >
                    <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                        Select brand
                    </MDTypography>
                </MDBox>
                <MDBox pt={2} pb={3} px={3}>
                    <MDBox>
                        <div className="brandSelector">
                            <MDBox mb={2}>
                                <Select
                                    required="true"
                                    style={{ borderRadius: 2, width: "100%" }}
                                    placeholder="Brand"
                                    onChange={brandChange}
                                >
                                    {listBrand.map((brand) => (
                                        <Option key={brand.brandId} value={brand.brandId}>{brand.name}</Option>
                                    ))}
                                </Select>

                                <MDBox mt={2}>
                                    <MDButton
                                        variant="gradient"
                                        color="info"
                                        fullWidth
                                        type="submit"
                                        onClick={() => {
                                            selectBrand()
                                        }}
                                    >
                                        Select
                                    </MDButton>
                                </MDBox>
                            </MDBox>
                        </div>
                    </MDBox>
                </MDBox>
            </Card>
        </BasicLayout>
    )
}

export default SelectBrand