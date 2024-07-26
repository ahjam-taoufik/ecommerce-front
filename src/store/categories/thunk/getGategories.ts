import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getGategories = createAsyncThunk(
  "categories/getGategories",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get("/categories");
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

export default getGategories;
