import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosClient";

const initialState = {
  users: [],
  idUserProduct: [],
  userImgAdmin: [],
  loading: false,
};

export const fetchCreateUserLogin = createAsyncThunk(
  "UserLoginSlice/fetchCreateUserLogin",
  async (userData: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const user: any = { ...userData, isAdmin: false };
      const res = await axiosInstance.post("/userImg", user);
      console.log(res);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fetchGetImgFalseAdmin = createAsyncThunk(
  "UserLoginSlice/fetchGetImgFalseAdmin",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res: any = await axiosInstance.get("/userImg?isAdmin=false");
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fetchGetUserLogin = createAsyncThunk(
  "UserLoginSlice/fetchGetUserLogin",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const state: any = getState();
    const res1: any = await axiosInstance.get("/userImg");
    const idUser = state.userState.idUser;
    console.log(idUser, "iduser");
    const resdata: any = res1.filter(
      (item: any) => Number(item.id) === Number(idUser)
    );

    console.log(resdata, "resdata");
    if (resdata.length === 0) {
      return rejectWithValue("Không tìm thấy người dùng");
    }
    return resdata;
  }
);

export const UserLoginSlice = createSlice({
  name: "UserLoginSlice",
  initialState: initialState,
  reducers: {
    setLoadingUser: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCreateUserLogin.pending, (state, action) => {});
    builder.addCase(
      fetchCreateUserLogin.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.users = action.payload;
      }
    );
    builder.addCase(fetchCreateUserLogin.rejected, (state, action) => {});

    builder.addCase(fetchGetUserLogin.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(
      fetchGetUserLogin.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.idUserProduct = action.payload;
        // localStorage.setItem("users", action.payload);
        state.loading = false;
      }
    );
    builder.addCase(fetchGetUserLogin.rejected, (state, action) => {});

    builder.addCase(fetchGetImgFalseAdmin.pending, (state, action) => {});
    builder.addCase(
      fetchGetImgFalseAdmin.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.userImgAdmin = action.payload;
      }
    );
    builder.addCase(fetchGetImgFalseAdmin.rejected, (state, action) => {});
  },
});
export const { setLoadingUser } = UserLoginSlice.actions;
export default UserLoginSlice.reducer;
