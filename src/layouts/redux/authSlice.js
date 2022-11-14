const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
    logout: {
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    loginStart: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.login.isFetching = false;
      // eslint-disable-next-line no-param-reassign
      state.login.currentUser = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.login.error = false;
    },
    loginFailed: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.login.isFetching = false;
      // eslint-disable-next-line no-param-reassign
      state.login.error = true;
    },
    logOutStart: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.logout.isFetching = true;
    },
    logOutSuccess: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.logout.isFetching = false;
      // eslint-disable-next-line no-param-reassign
      state.login.currentUser = null;
      // eslint-disable-next-line no-param-reassign
      state.logout.error = false;
    },
    logOutFailed: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.login.isFetching = false;
      // eslint-disable-next-line no-param-reassign
      state.login.error = true;
    },
  },
});

export const { loginStart, loginFailed, loginSuccess, logOutStart, logOutSuccess, logOutFailed } =
  authSlice.actions;
export default authSlice.reducer;
