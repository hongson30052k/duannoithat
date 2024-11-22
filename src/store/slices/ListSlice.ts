import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosClient";

// export interface IListProduct {
//   id: number;
//   title: string;
//   price: number;
//   category: string;
//   quantity: number;
// }

// export const fetchListProductAPI = createAsyncThunk(
//   "listSlice/fetchListProductAPI",
//   async (_, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//     try {
//       const res = await axiosInstance.get("https://dummyjson.com/products", {
//         baseURL: "/",
//       });
//       return res;
//     } catch (error) {
//       rejectWithValue(error);
//     }
//   }
// );

// interface IInitialState {
//   listProduct: IListProduct[];
//   cart: IListProduct[];
// }

// const initialState: IInitialState = {
//   listProduct: [],
//   cart: [],
// };

// export const listSlice = createSlice({
//   name: "listSlice",
//   initialState: initialState,
//   reducers: {
//     addToCart: (state, action: PayloadAction<IListProduct>) => {
//       const exciterCart = state.cart.find(
//         (cart) => cart.id === action.payload.id
//       );
//       if (!exciterCart) {
//         state.cart.push({ ...action.payload, quantity: 1 });
//       } else {
//         exciterCart.quantity += 1;
//       }
//     },
//     removeToCart: (state, action: PayloadAction<number>) => {
//       state.cart = state.cart.filter((cart) => cart.id !== action.payload);
//     },
//     increaseCart: (state, action: PayloadAction<number>) => {
//       const index = state.cart.findIndex((cart) => cart.id === action.payload);
//       state.cart[index].quantity += 1;
//     },
//     decreaseCart: (state, action: PayloadAction<number>) => {
//       const index = state.cart.findIndex((cart) => cart.id === action.payload);
//       if (state.cart[index].quantity > 1) {
//         state.cart[index].quantity -= 1;
//       }
//     },
//   },
//   extraReducers(builder) {
//     builder.addCase(fetchListProductAPI.pending, (state, action) => {});
//     builder.addCase(
//       fetchListProductAPI.fulfilled,
//       (state, action: PayloadAction<any>) => {
//         state.listProduct = action.payload.products;
//       }
//     );
//     builder.addCase(fetchListProductAPI.rejected, (state, action) => {});
//   },
// });

// export const { addToCart, removeToCart, increaseCart, decreaseCart } =
//   listSlice.actions;
// export default listSlice.reducer;
