import { createSlice } from "@reduxjs/toolkit";
import actLikeToggle from "./act/actLikeToggle";
import actGetWichlist from "./act/actGetWichlist";
import { TProducts } from "src/types/ProductsTypes";
import { TLoading } from "src/types/Types";
interface IWishlist {
  itemsId: number[];
  error: string | null;
  productFullInfo: TProducts[];
  loading: TLoading;
}

const initialState: IWishlist = {
  itemsId: [],
  error: null,
  loading: "idle",
  productFullInfo: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    productWishlistFullInfoCleanUp: (state) => {
      state.productFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actLikeToggle.pending, (state) => {
      state.error = null;
    });
    builder.addCase(actLikeToggle.fulfilled, (state, action) => {
      if (action.payload.type === "add") {
        state.itemsId.push(action.payload.id);
      } else {
        state.itemsId = state.itemsId.filter((el) => el !== action.payload.id);
        state.productFullInfo = state.productFullInfo.filter(
          (el) => el.id !== action.payload.id
        );
      }
    });
    builder.addCase(actLikeToggle.rejected, (state, action) => {
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    // getWichlist
    builder.addCase(actGetWichlist.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetWichlist.fulfilled, (state, action) => {
      state.loading = "succeded";
      state.productFullInfo = action.payload;
    });
    builder.addCase(actGetWichlist.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export const { productWishlistFullInfoCleanUp } = wishlistSlice.actions;
export { actLikeToggle, actGetWichlist };
export default wishlistSlice.reducer;
