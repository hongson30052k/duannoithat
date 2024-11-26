import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosClient";
import { toast } from "react-toastify";

const initialState: any = {
  items: [],
  itemProduct: [],
  orderUser: [],
  status: false,
};

export const fetchCreateOrder = createAsyncThunk(
  "CartOderSlice/fetchCreateOrder",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosInstance.post("/orders", data);
      return res;
    } catch (error) {
      return rejectWithValue("error");
    }
  }
);

export const fetchGetOrder = createAsyncThunk(
  "CartOderSlice/fetchGetOrder",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosInstance.get("/orders");
      return res;
    } catch (error) {
      return rejectWithValue("error");
    }
  }
);
export const fetchGetOrderProduct = createAsyncThunk(
  "CartOderSlice/fetchGetOrderProduct",
  async (id: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res: any = await axiosInstance.get(`/orders/${id}`);
      return res;
    } catch (error) {
      return rejectWithValue("error");
    }
  }
);
export const fetchChangePendingOrderProduct = createAsyncThunk(
  "CartOderSlice/fetchChangePendingOrderProduct",
  async (id: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res: any = await axiosInstance.get(`/orders/${id}`);
      const updateStatus = { ...res, status: "Processing" };
      const response = await axiosInstance.put(`/orders/${id}`, {
        ...updateStatus,
      });
      return response;
    } catch (error) {
      return rejectWithValue("error");
    }
  }
);
export const fetchChangeStatusOrderProduct = createAsyncThunk(
  "CartOderSlice/fetchChangeStatusOrderProduct",
  async ({ id, status }: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res: any = await axiosInstance.get(`/orders/${id}`);
      const updateStatus = { ...res, status: status };
      const response = await axiosInstance.put(`/orders/${id}`, {
        ...updateStatus,
      });
      return response;
    } catch (error) {
      return rejectWithValue("error");
    }
  }
);
export const fetchCancleOrderProduct = createAsyncThunk(
  "CartOderSlice/fetchCancleOrderProduct",
  async (id: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res: any = await axiosInstance.get(`/orders/${id}`);
      const updateStatus = { ...res, status: "Canceled" };
      const response = await axiosInstance.put(`/orders/${id}`, {
        ...updateStatus,
      });
      return response;
    } catch (error) {
      return rejectWithValue("error");
    }
  }
);

export const fetchProductOrderUserId = createAsyncThunk(
  "CartOderSlice/fetchProductOrderUserId",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const state: any = getState();
    const id = state.userState.idUser;
    try {
      const res: any = await axiosInstance.get(`/orders?userId=${id}`);
      console.log(res);
      return res;
    } catch (error) {
      return rejectWithValue("error");
    }
  }
);

export const fetchDeleteOrder = createAsyncThunk(
  "CartOderSlice/fetchDeleteOrder",
  async (id: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosInstance.delete(`/orders/${id}`);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const CartOderSlice = createSlice({
  name: "CartOderSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetOrder.pending, (state, action) => {});
    builder.addCase(fetchGetOrder.fulfilled, (state, action) => {
      // state.status = !state.status;
      state.items = action.payload;
    });
    builder.addCase(fetchGetOrder.rejected, (state, action) => {});

    builder.addCase(fetchGetOrderProduct.pending, (state, action) => {});
    builder.addCase(fetchGetOrderProduct.fulfilled, (state, action) => {
      state.itemProduct = action.payload;
      state.status = !state.status;
    });
    builder.addCase(fetchGetOrderProduct.rejected, (state, action) => {});

    builder.addCase(
      fetchChangePendingOrderProduct.pending,
      (state, action) => {}
    );
    builder.addCase(
      fetchChangePendingOrderProduct.fulfilled,
      (state, action) => {
        state.status = !state.status;
        state.itemProduct = action.payload;
        toast.success("xác nhận đơn hàng thành công");
      }
    );
    builder.addCase(
      fetchChangePendingOrderProduct.rejected,
      (state, action) => {
        toast.error("xác nhận đơn hàng thất bại");
      }
    );

    builder.addCase(fetchChangeStatusOrderProduct.pending, (state, action) => {
      state.status = !state.status;
    });
    builder.addCase(
      fetchChangeStatusOrderProduct.fulfilled,
      (state, action) => {
        state.status = !state.status;
        state.itemProduct = action.payload;
        toast.success("Chuyển trạng thái đơn hàng thành công");
      }
    );
    builder.addCase(fetchChangeStatusOrderProduct.rejected, (state, action) => {
      toast.error("Chuyển trạng thái đơn hàng thất bại");
    });

    builder.addCase(fetchProductOrderUserId.pending, (state, action) => {});
    builder.addCase(fetchProductOrderUserId.fulfilled, (state, action) => {
      state.orderUser = action.payload;
    });
    builder.addCase(fetchProductOrderUserId.rejected, (state, action) => {});

    builder.addCase(fetchCancleOrderProduct.pending, (state, action) => {});
    builder.addCase(fetchCancleOrderProduct.fulfilled, (state, action) => {
      state.status = !state.status;
      toast.success("Huỷ đơn hàng thành công");
    });
    builder.addCase(fetchCancleOrderProduct.rejected, (state, action) => {
      toast.error("Huỷ đơn hàng thất bại");
    });

    builder.addCase(fetchDeleteOrder.pending, (state, action) => {});
    builder.addCase(fetchDeleteOrder.fulfilled, (state, action) => {
      state.status = !state.status;
    });
    builder.addCase(fetchDeleteOrder.rejected, (state, action) => {});
  },
});

export const {} = CartOderSlice.actions;
export default CartOderSlice.reducer;
