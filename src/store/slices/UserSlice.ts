import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosClient";
const initialState = {
  users: [],
  status: "idle",
  error: null,
  isAuthenticated: false,
  isAdmin: false,
  idUser: "",
  userRender: [],
  statusPassword: false,
  userFalseAdmin: [],
};

export const fetchGetUserFalseAdmin = createAsyncThunk(
  "userSlice/fetchGetUserFalseAdmin",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res: any = await axiosInstance.get("/users?isAdmin=false");
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fetchCreateUser = createAsyncThunk(
  "userSlice/fetchCreateUser",
  async (userData: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosInstance.post("/users", userData);
      console.log(res);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fetchGetUser = createAsyncThunk(
  "userSlice/fetchGetUser",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosInstance.get("/users");
      console.log(res);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk<any, any>(
  "userSlice/loginUser",
  async ({ username, password }: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const users: any[] = await axiosInstance.get("/users");
      const user = users?.find(
        (user: any) =>
          user?.username === username && user?.password === password
      );

      if (!user) {
        return rejectWithValue("Tên đăng nhập hoặc mật khẩu không đúng");
      }

      return user;
    } catch (error) {
      return rejectWithValue("Tên đăng nhập hoặc mật khẩu không đúng");
    }
  }
);

export const fetchEditUser = createAsyncThunk(
  "userSlice/fetchEditUser",
  async ({ id, password }: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosInstance.patch(`/users/${id}`, {
        password: password,
      });
      console.log(id, password, "password res");
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const UserSlice = createSlice({
  name: "UserSlice",
  initialState: initialState,
  reducers: {
    getUser: (state = initialState, action: PayloadAction<any>) => {
      state.users = action.payload;
    },
    getIdUser: (state = initialState, action: PayloadAction<any>) => {},
    setError: (state = initialState) => {
      state.error = null;
    },
    setUserFromLocalStorage: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = true;
      state.userRender = action.payload;
      state.idUser = action.payload.id;
      state.isAdmin = action.payload.isAdmin;
    },
    logoutUser: (state) => {
      localStorage.removeItem("user");
      state.isAuthenticated = false;
      state.userRender = [];
      state.idUser = "";
      state.isAdmin = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCreateUser.pending, (state, action) => {});
    builder.addCase(
      fetchCreateUser.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        const value = { ...action.payload, isAdmin: true };
        state.users = value;
        state.status = "success";
      }
    );
    builder.addCase(fetchCreateUser.rejected, (state, action) => {});

    builder.addCase(fetchGetUser.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(
      fetchGetUser.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.status = "success";
        state.user = action.payload;
      }
    );
    builder.addCase(fetchGetUser.rejected, (state, action: any) => {
      state.status = "failed";
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.status = "success";
        state.isAuthenticated = true;
        state.isAdmin = action.payload.isAdmin;
        state.idUser = action.payload.id;
        state.userRender = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    );
    builder.addCase(loginUser.rejected, (state, action: any) => {
      state.status = "failed";
      state.error = action.payload;
      state.isAuthenticated = false;
    });

    builder.addCase(fetchEditUser.pending, (state, action) => {});
    builder.addCase(
      fetchEditUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.statusPassword = true;
        state.userRender = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    );
    builder.addCase(fetchEditUser.rejected, (state, action) => {});
    builder.addCase(fetchGetUserFalseAdmin.pending, (state, action) => {});
    builder.addCase(fetchGetUserFalseAdmin.fulfilled, (state, action) => {
      state.userFalseAdmin = action.payload;
    });
    builder.addCase(fetchGetUserFalseAdmin.rejected, (state, action) => {});
  },
});

export const {
  getUser,
  getIdUser,
  setError,
  setUserFromLocalStorage,
  logoutUser,
} = UserSlice.actions;
export default UserSlice.reducer;
