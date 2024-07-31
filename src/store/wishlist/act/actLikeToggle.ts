import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actLikeToggle = createAsyncThunk(
  "wishlist/actLikeToggle",
  async (id: number, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI;

    try {
      const isRecordExist = await axios.get(
        `/wishlist?userId=1&productId=${id}`
      );

      if (isRecordExist.data.length > 0) {
        await axios.delete(`/wishlist/${isRecordExist.data[0].id}`);
        return { type: "remove", id };
      } else {
        await axios.post("/wishlist", { userId: 1, productId: id });
        return { type: "add", id };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectedWithValue(error.response?.data.message || error.message);
      } else {
        return rejectedWithValue("An unexpected error occurred");
      }
    }
  }
);

export default actLikeToggle;
