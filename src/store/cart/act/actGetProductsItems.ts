import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from "axios";
import { TProducts } from "src/types/ProductsTypes";

type TResponse = TProducts[];

const actGetProductsItems = createAsyncThunk(
  "cart/actGetProductsItems",
  async (_, thunkAPI) => {
    const { getState, rejectedWithValue, fulfillWithValue } = thunkAPI;
    const { cart } = getState() as RootState;
    const ItemsId = Object.keys(cart.items);

    if (ItemsId.length === 0) {
      return rejectedWithValue([]);
    }

    try {
      const concatenatedItems = ItemsId.map((item) => `id=${item}`).join("&");
      const response = await axios.get<TResponse>(
        `/products?${concatenatedItems}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectedWithValue(error.response?.data.message || error.message);
      } else {
        return rejectedWithValue("An unexpected error occurred");
      }
    }
  }
);

export default actGetProductsItems;
