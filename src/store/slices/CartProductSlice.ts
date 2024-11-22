import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosClient";

interface IInitialState {
  card: any[];
  productId: string;
  cardId: any[];
  cartImg: any[];
  cardImg: any[];
  status: boolean;
  color: any[];
  country: any[];
  productOptions: any[];
  productOptionId: number;
  checkedPrice: number;
  checked: boolean;
  statusCheck: number;
  searchInputValue: string;
  search: null | string;
  searchValue: string;
  ShowModalEdit: boolean;
  loading: boolean;
}

const initialState: IInitialState = {
  card: [],
  productId: "",
  cardId: [],
  cartImg: [],
  cardImg: [],
  status: false,
  color: [],
  country: [],
  productOptions: [],
  productOptionId: 0,
  checkedPrice: 0,
  checked: false,
  statusCheck: 0,
  searchInputValue: "",
  search: null,
  searchValue: "",
  ShowModalEdit: false,
  loading: false,
};
export const fetchCartProductAPI = createAsyncThunk(
  "cartProductSlice/fetchCartProductAPI",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosInstance.get("/products");
      console.log(res, "resproduct");
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const fetchCartProductAPIPage = createAsyncThunk(
  "cartProductSlice/fetchCartProductAPIPage",
  async ({ currentPage, limit }: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosInstance.get(
        `/products?_page=${currentPage}&_limit=${limit}`
      );
      console.log(res, "resproduct");
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const fetchCartProductTotalCategory = createAsyncThunk(
  "cartProductSlice/fetchCartProductTotalCategory",
  async ({ productOptionId }: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosInstance.get(
        `/products?category=${productOptionId}`
      );
      console.log(res, "resproduct");
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const fetchCartProductAPIPageCategory = createAsyncThunk(
  "cartProductSlice/fetchCartProductAPIPageCategory",
  async ({ productOptionId, currentPage, limit }: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosInstance.get(
        `/products?_page=${currentPage}&_limit=${limit}&category=${productOptionId}`
      );
      console.log(res, "resproduct");
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fetchColor = createAsyncThunk(
  "userProductSlice/fetchColor",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res: any = await axiosInstance.get("/color");
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const fetchGetPriceUnder1000k = createAsyncThunk(
  "userProductSlice/fetchGetPriceUnder1000k",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res: any = await axiosInstance.get(
        "/products/sortByPriceUnder1000K"
      );
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const fetchGetPriceUnder1000kPage = createAsyncThunk(
  "userProductSlice/fetchGetPriceUnder1000kPage",
  async ({ currentPage, limit }: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res: any = await axiosInstance.get(
        `/products/sortByPriceUnder1000K?_page=${currentPage}&_limit=${limit}`
      );
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const fetchGetPriceUnder1000kCateGory = createAsyncThunk(
  "userProductSlice/fetchGetPriceUnder1000kCateGory",
  async ({ productOptionId, currentPage, limit }: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res: any = await axiosInstance.get(
        `/products/sortByPriceUnder1000KPage?_page=${currentPage}&_limit=${limit}&category=${productOptionId}`
      );
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const fetchGetPriceFrom1mto5m = createAsyncThunk(
  "userProductSlice/fetchGetPriceFrom1mto5m",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res: any = await axiosInstance.get(
        "/products/sortByPriceFrom1mto5m"
      );
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const fetchGetPriceFrom1mto5mPage = createAsyncThunk(
  "userProductSlice/fetchGetPriceFrom1mto5m",
  async ({ currentPage, limit }: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res: any = await axiosInstance.get(
        `/products/sortByPriceFrom1mto5mPage?_page=${currentPage}&_limit=${limit}`
      );
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fetchGetPriceFrom1mto5mCateGory = createAsyncThunk(
  "userProductSlice/fetchGetPriceFrom1mto5mCateGory",
  async ({ productOptionId, currentPage, limit }: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res: any = await axiosInstance.get(
        `/products/sortByPriceFrom1mto5mPage?_page=${currentPage}&_limit=${limit}&category=${productOptionId}`
      );
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const fetchGetPriceOver5m = createAsyncThunk(
  "userProductSlice/fetchGetPriceOver5m",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res: any = await axiosInstance.get("/products/sortByPriceOver5m");
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const fetchGetPriceOver5mPage = createAsyncThunk(
  "userProductSlice/fetchGetPriceOver5mPage",
  async ({ currentPage, limit }: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res: any = await axiosInstance.get(
        `/products/sortByPriceOver5mPage?_page=${currentPage}&_limit=${limit}`
      );
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fetchGetPriceOver5mCategory = createAsyncThunk(
  "userProductSlice/fetchGetPriceOver5mCategory",
  async ({ productOptionId, currentPage, limit }: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res: any = await axiosInstance.get(
        `/products/sortByPriceOver5mPage?_page=${currentPage}&_limit=${limit}&category=${productOptionId}`
      );
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const fetchSearchProducts = createAsyncThunk(
  "userProductSlice/fetchSearchProducts",
  async ({ searchValue }: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res: any = await axiosInstance.get(
        `products?name_like=${searchValue}`
      );
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const fetchSearchProductsView = createAsyncThunk(
  "userProductSlice/fetchSearchProductsView",
  async ({ inputValueCart }: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res: any = await axiosInstance.get(
        `products?name_like=${inputValueCart}`
      );
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fetchSearchProductsPage = createAsyncThunk(
  "userProductSlice/fetchSearchProductsPage",
  async ({ value, currentPage, limit }: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res: any = await axiosInstance.get(
        `products?name_like=${value}&_page=${currentPage}&_limit=${limit}`
      );
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fetchGetImgProduct = createAsyncThunk(
  "userProductSlice/fetchGetImgProduct",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res: any = await axiosInstance.get("/imgProduct");
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const fetchProductOptions = createAsyncThunk(
  "userProductSlice/fetchProductOptions",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res: any = await axiosInstance.get("/productOptions");
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const fetchProductOptionsId = createAsyncThunk(
  "userProductSlice/fetchProductOptionsId",
  async (id: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res: any = await axiosInstance.get(`/productOptions/${id}`);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const fetchGetCountry = createAsyncThunk(
  "userProductSlice/fetchGetCountry",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res: any = await axiosInstance.get("/asianCountries");
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const fetchGetImgProductId = createAsyncThunk(
  "userProductSlice/fetchGetImgProductId",
  async (id: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res: any = await axiosInstance.get(`/imgProduct/${id}`);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fetchAddImgProduct = createAsyncThunk(
  "userProductSlice/fetchAddImgProduct",
  async (data: any, { rejectWithValue }) => {
    try {
      const response: any = await axiosInstance.post(`/imgProduct`, data);
      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fetchProductApi = createAsyncThunk(
  "cartProductSlice/fetchProductApi",
  async (id: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res: any = await axiosInstance.get(`/products/${id}`);
      console.log(res, "res");
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fetchAddToCart = createAsyncThunk(
  "cartProductSlice/fetchAddToCart",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosInstance.post(`/products`, data);
      console.log(res, "resproduct");
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const fetchEditProduct = createAsyncThunk(
  "cartProductSlice/fetchEditProduct",
  async ({ id, value }: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const resGet: any = await axiosInstance.get(`/products/${id}`);
      const values = { ...resGet, ...value };
      console.log(values, "values-----------------1111111111111");
      console.log(resGet, "resGet");
      const resPost = await axiosInstance.put(`/products/${id}`, values);
      return resPost;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fetchDeleteCart = createAsyncThunk(
  "cartProductSlice/fetchDeleteCart",
  async (id: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosInstance.delete(`/products/${id}`);
      console.log(res, "resproduct");
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const fetchDeleteImgCart = createAsyncThunk(
  "cartProductSlice/fetchDeleteImgCart",
  async (id: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosInstance.delete(`/imgProduct/${id}`);
      console.log(res, "resproduct");
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const cartProductSlice = createSlice({
  name: "cartProductSlice",
  initialState: initialState,
  reducers: {
    setLoading: (state = initialState, action: PayloadAction<any>) => {
      state.loading = action.payload;
    },
    getIdProductOption: (state = initialState, action: PayloadAction<any>) => {
      state.productOptionId = action.payload;
    },
    getProductId: (state = initialState, action: PayloadAction<any>) => {
      state.productId = action.payload;
    },
    checkeds: (state = initialState, action: PayloadAction<any>) => {
      const { isChecked, checked } = action.payload;
      state.checkedPrice = isChecked;
      state.checked = checked;
    },
    search: (state = initialState, action: PayloadAction<any>) => {
      state.searchValue = action.payload;
    },
    searchInputValue: (state = initialState, action: PayloadAction<any>) => {
      state.searchInputValue = action.payload;
    },
    searchStatus: (state = initialState, action: PayloadAction<any>) => {
      state.search = action.payload;
    },
    setShowModalEdit: (state = initialState, action: PayloadAction<any>) => {
      state.ShowModalEdit = action.payload;
    },
    setStatusCheck: (state = initialState, action: PayloadAction<any>) => {
      state.statusCheck = state.statusCheck + 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartProductAPI.pending, (state, action) => {});
    builder.addCase(
      fetchCartProductAPI.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.card = action.payload;
      }
    );
    builder.addCase(fetchCartProductAPI.rejected, (state, action) => {
      console.log(action);
    });

    builder.addCase(fetchProductApi.pending, (state, action) => {});
    builder.addCase(
      fetchProductApi.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.cardId = action.payload;
      }
    );
    builder.addCase(fetchProductApi.rejected, (state, action) => {
      console.log(action);
    });

    builder.addCase(fetchAddToCart.pending, (state, action) => {});
    builder.addCase(
      fetchAddToCart.fulfilled,
      (state, action: PayloadAction<any>) => {}
    );
    builder.addCase(fetchAddToCart.rejected, (state, action) => {
      console.log(action);
    });

    builder.addCase(fetchDeleteCart.pending, (state, action) => {});
    builder.addCase(
      fetchDeleteCart.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.status = !state.status;
      }
    );
    builder.addCase(fetchDeleteCart.rejected, (state, action) => {});

    builder.addCase(fetchGetImgProduct.pending, (state, action) => {});
    builder.addCase(
      fetchGetImgProduct.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.cartImg = action.payload;
      }
    );

    builder.addCase(fetchGetImgProduct.rejected, (state, action) => {});
    builder.addCase(fetchAddImgProduct.pending, (state, action) => {});
    builder.addCase(
      fetchAddImgProduct.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.status = !state.status;
        state.loading = true;
      }
    );
    builder.addCase(fetchAddImgProduct.rejected, (state, action) => {});
    builder.addCase(fetchGetImgProductId.pending, (state, action) => {});
    builder.addCase(
      fetchGetImgProductId.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.cardImg = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(fetchGetImgProductId.rejected, (state, action) => {});
    builder.addCase(fetchColor.pending, (state, action) => {});
    builder.addCase(
      fetchColor.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.color = action.payload;
      }
    );
    builder.addCase(fetchColor.rejected, (state, action) => {});
    builder.addCase(fetchGetCountry.pending, (state, action) => {});
    builder.addCase(
      fetchGetCountry.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.country = action.payload;
      }
    );
    builder.addCase(fetchGetCountry.rejected, (state, action) => {});
    builder.addCase(fetchProductOptions.pending, (state, action) => {});
    builder.addCase(fetchProductOptions.fulfilled, (state, action) => {
      state.productOptions = action.payload;
    });
    builder.addCase(fetchProductOptions.rejected, (state, action) => {});
    builder.addCase(fetchEditProduct.pending, (state, action) => {});
    builder.addCase(fetchEditProduct.fulfilled, (state, action) => {
      state.status = !state.status;
    });
    builder.addCase(fetchEditProduct.rejected, (state, action) => {});
    builder.addCase(fetchGetPriceUnder1000k.pending, (state, action) => {});
    builder.addCase(fetchGetPriceUnder1000k.fulfilled, (state, action) => {
      state.status = action.payload;
    });
    builder.addCase(fetchGetPriceUnder1000k.rejected, (state, action) => {});
    builder.addCase(
      fetchGetPriceFrom1mto5mCateGory.pending,
      (state, action) => {}
    );
    builder.addCase(
      fetchGetPriceFrom1mto5mCateGory.fulfilled,
      (state, action) => {
        state.status = action.payload;
      }
    );
    builder.addCase(
      fetchGetPriceFrom1mto5mCateGory.rejected,
      (state, action) => {}
    );
  },
});

export const {
  setStatusCheck,
  getProductId,
  getIdProductOption,
  checkeds,
  search,
  searchInputValue,
  searchStatus,
  setShowModalEdit,
  setLoading,
} = cartProductSlice.actions;
export default cartProductSlice.reducer;
