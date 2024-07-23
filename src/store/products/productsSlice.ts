import { createSlice } from "@reduxjs/toolkit";
import { TError, TLoading, TProducts } from "src/types/ProductsTypes";
import getProducts from "./thunk/getProducts";

export interface IProductsState {
  records: TProducts[];
  loading: TLoading;
  error: TError;
}

const initialState: IProductsState = {
  records: [],
  loading: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsClenUp: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = "succeded";
      state.records = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export const { productsClenUp } = productsSlice.actions;
export default productsSlice.reducer;
