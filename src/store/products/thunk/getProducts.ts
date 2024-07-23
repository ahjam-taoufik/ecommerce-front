import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getProducts = createAsyncThunk(
  "products/getProducts",
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        `http://localhost:3010/products?cat_prefix=${prefix}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export default getProducts;
