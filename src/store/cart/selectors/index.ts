import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/index";

const getCartTotalQuantitySelector = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    const QuantityTotal = Object.values(items).reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue;
      },
      0
    );
    return QuantityTotal;
  }
);

export { getCartTotalQuantitySelector };
