import {
  CartItem,
  CartItemList,
  CartSubtotalPrice,
} from "@components/eCommerce";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { useCallback, useEffect } from "react";
import {
  actGetProductsItems,
  cartItemChangeQuantity,
  cleanCartProductsFullinfos,
  removeItem,
} from "@store/cart/cartSlice";
import { Loading } from "@components/feedback";
function Cart() {
  const { items, productsFullinfos, loading, error } = useAppSelector(
    (state) => state.cart
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actGetProductsItems());

    return () => {
      dispatch(cleanCartProductsFullinfos());
    };
  }, [dispatch]);

  const products = productsFullinfos.map((product) => ({
    ...product,
    quantity: items[product.id],
  }));

  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const removeItemHandler = useCallback((id: number) => {
    dispatch(removeItem(id));
  }, []);

  return (
    <>
      <h3>Cart</h3>
      <Loading loading={loading} error={error}>
        {products.length ? (
          <>
            <CartItemList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeItemHandler={removeItemHandler}
            />
            <CartSubtotalPrice products={products} />
          </>
        ) : (
          "Your Cart is Empty"
        )}
      </Loading>
    </>
  );
}

export default Cart;
