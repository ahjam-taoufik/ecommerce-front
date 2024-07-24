import { createSlice } from "@reduxjs/toolkit";
import { TProducts } from "src/types/ProductsTypes";

interface ICartState {
  items: { [key: number]: number };
  productFullinfo: TProducts[];
}

const initialState: ICartState = {
  items: {},
  productFullinfo: [],
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
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
