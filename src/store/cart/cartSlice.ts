import { createSlice } from "@reduxjs/toolkit";
import { TProducts } from "src/types/ProductsTypes";
import actGetProductsItems from "./act/actGetProductsItems";
import { TError, TLoading } from "src/types/Types";
interface ICartState {
  items: { [key: string]: number };
  productsFullinfos: TProducts[];
  loading: TLoading;
  error: TError;
}

const initialState: ICartState = {
  items: {},
  productsFullinfos: [],
  loading: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      //   console.log(action.payload);
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
    cartItemChangeQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      state.items[id] = quantity;
    },
    removeItem: (state, action) => {
      const id = action.payload;
      delete state.items[id];
      state.productsFullinfos = state.productsFullinfos.filter(
        (product) => product.id !== id
      );
    },
    cleanCartProductsFullinfos: (state) => {
      state.productsFullinfos = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actGetProductsItems.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetProductsItems.fulfilled, (state, action) => {
        state.loading = "succeded";
        state.productsFullinfos = action.payload;
      })
      .addCase(actGetProductsItems.rejected, (state, action) => {
        state.loading = "failed";
        if (action.payload && typeof action.payload === "string") {
          state.error = action.payload;
        }
      });
  },
});

export { actGetProductsItems };

export const {
  addToCart,
  cartItemChangeQuantity,
  removeItem,
  cleanCartProductsFullinfos,
} = cartSlice.actions;
export default cartSlice.reducer;
