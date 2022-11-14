import axios from "axios";
import jwtDecode from "jwt-decode";
import { loginFailed, loginStart, loginSuccess, logOutStart } from "./authSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://oggycute.tplinkdns.com:31080/api/users/login", user);
    dispatch(loginSuccess(res.data));
    const jwtUser = jwtDecode(res.data.tokenString);

    const axiosConfigUser = {
      method: "get",
      url: `http://oggycute.tplinkdns.com:31080/api/users/${jwtUser.Id}`,
      data: {},
      headers: {
        Accept: "application/json; text/plain; */*",
        Authorization: `Bearer ${res.data.tokenString}`,
        "Content-Type": "application/json;charset=utf-8",
      },
    };
    axios(axiosConfigUser)
      .then((response) => {
        console.log(response.data.user.role);
        JSON.stringify(response.data);
        if (response.data.user.role === "staff") {
          navigate("/brand");
        } else if (response.data.user.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/dashboard");
        }
      })  
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    dispatch(loginFailed());
  }
};
export const logoutUser = async (dispatch, navigate) => {
  dispatch(logOutStart);
  try {
    dispatch(loginSuccess(null));
    navigate("/sign-in");
  } catch (error) {}
};
