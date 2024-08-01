import { createSlice } from "@reduxjs/toolkit";
import getGategories from "./thunk/getGategories";
import { TCategories, TError, TLoading } from "src/types/Types";

export interface ICategoriesState {
  records: TCategories[];
  loading: TLoading;
  error: TError;
}

const initialState: ICategoriesState = {
  records: [],
  loading: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    cleanUpCategories: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGategories.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getGategories.fulfilled, (state, action) => {
      state.loading = "succeded";
      state.records = action.payload;
    });
    builder.addCase(getGategories.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export const { cleanUpCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
