import { TProducts } from "src/types/ProductsTypes";
import CartItem from "../CartItem/CartItem";

type CartItemListProps = {
  products: TProducts[];
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
};

function CartItemList({
  products,
  changeQuantityHandler,
  removeItemHandler,
}: CartItemListProps) {
  const renderProductsList = products.map((product) => (
    <CartItem
      key={product.id}
      {...product}
      changeQuantityHandler={changeQuantityHandler}
      removeItemHandler={removeItemHandler}
    />
  ));

  return <div>{renderProductsList}</div>;
}

export default CartItemList;
